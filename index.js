$(document).ready(function (){
});


function searchRepositories() {
  const term = document.getElementById('searchTerms').value;
  const url = `https://api.github.com/search/repositories?q=${term}`
  $.get(url, data => {
    console.log(data);
    $('#results').html(renderResults(data))
  })
}

var renderResults = (data) => data.items.map( result => {
  return `
  <img src="${result.owner.avatar_url}" width="45 px"><br>
  Name: ${result.name}<br>
  Description: ${result.description}<br>
  URL: <a href="${result.html_url}">${result.html_url}</a><br>
  Owner: ${result.owner.login}<br>
  Owner Profile Page: <a href="${result.owner.url}">${result.owner.url}</a><br>
  <a href="#" onClick="showCommits(${result.commits_url})">Show Commits</a><br><br>
  `
})

function showCommits(url) {
  console.log(url);
}



