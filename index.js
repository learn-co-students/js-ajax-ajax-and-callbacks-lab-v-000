$(document).ready(function (){
});

function searchRepositories() {
  const searchTerms = document.getElementById("searchTerms").value;
  const searchURL = `https://api.github.com/search/repositories?q=${searchTerms}`;
  $.get(searchURL, function(data) {
    $("#results").append("Hello!");
  });
  // const xhr = new XMLHttpRequest();
  // xhr.addEventListener('load', showRepositories);
  // xhr.open('GET', searchURL);
  // xhr.send();
}

function showRepositories() {
  const repos = JSON.parse(this.responseText);
  const repoList = repos;
  document.getElementById("results").innerHTML = repoList;
}
