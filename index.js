$(document).ready(function (){

});

function searchRepositories() {
  const searchTerms = document.getElementById('searchTerms').value.replace(' ','+');
  const url = `https://api.github.com/search/repositories?q=${searchTerms}`; 
  $.get(url, displayRepositories).fail(displayError);
}

function displayRepositories(data) {
  const repos = data.items;
  //const src = document.getElementById("repo-template").innerHTML;
  //const template = Handlebars.compile(src);
  //const repoList = template(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + 
    `<a href="${r.html_url}">${r.name}</a><br>` + 
    `<p>${r.description}</p>` +
    `<a href="#" data-owner="${r.owner.login}" data-repository="${r.name}" onclick="showCommits(this);">Show Commits</a><br><br>` +
    '</li>').join('')}</ul>`
  document.getElementById("results").innerHTML = repoList
}

function displayError(error) {
  const htmlString = `<p>There was an error!</p>`;
  document.getElementById('errors').innerHTML += htmlString;
}

function showCommits(el) {
  const owner = el.dataset.owner;
  const repo = el.dataset.repository;
  const url = `https://api.github.com/repos/${owner}/${repo}/commits`;
  $.get(url, displayCommits).fail(displayError);
}

function displayCommits(data) {
  const commits = data;
  const commitsList = `<ul>${commits.map(r => '<li>' + 
  `<p>Sha: ${r.sha}</p>` +
  '</li>').join('')}</ul>`
document.getElementById("details").innerHTML = commitsList;
}