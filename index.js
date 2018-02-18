$(document).ready(function (){
  searchRepositories().done()
});

function searchRepositories() {
  const url = 'https://api.github.com/search/repositories?q=' + document.getElementById("searchTerms").value;
  $.get(url, function(data){
    displayResults();
  });
}

function displayResults(){
  // repo name, description, link to HTML URL
  const results = JSON.parse(this.responseText);
  const resultList = `<ul>${results.map(r => '<li>' + '<a href="' + r.html_url + '>' + r.name + '</a> - Description: ' + r.description).join("")}</ul>`;
  document.getElementById("results").innerHTML = resultList;
}
