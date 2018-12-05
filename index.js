$(document).ready(function (){



});

function displayError() {
  document.getElementById('errors').innerHTML = "error";
}

function searchRepositories() {
  //debugger
  const term = document.getElementById('searchTerms').value
  const req = new XMLHttpRequest();
  req.addEventListener('load', showRepositories);
  req.open('GET', 'https://api.github.com/search/repositories?q=' + term);
  req.send();
}

function showRepositories(event, data) {
  const repos = JSON.parse(this.responseText).items;
  debugger
  const repoList = `<ul>${repos
    .map(r => '<li><a href=' + r.html_url + '>' + r.name + '-' + r.description + '</a></li>')
    .join('')}</ul>`;
  document.getElementById('results').innerHTML = repoList;
  //debugger
}
