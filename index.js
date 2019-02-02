$(document).ready(function (){
});

function searchRepositories() {
  let search = document.getElementById('searchTerms').value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/search/repositories?q=${search}`);
  req.send();
}

function displayRepositories() {
  const parsed = JSON.parse(this.responseText);
  const repos = parsed.items;
  const repoList = `<ul>${repos.map(repo => '<li><a href="' + repo.html_url + '">' + repo.name + '</a> | ' + repo.description + ' | <a href="' + repo.owner.html_url + '">' + repo.owner.login + '</a> <img height=30 width=30 src="' + repo.owner.avatar_url + '"><a href="#" data-owner="' + repo.owner.login + '" data-repository="' + repo.name + '" onclick="showCommits(this);">Show Commits</a></li>').join('')}</ul>`;
  document.getElementById('results').innerHTML = repoList;
}

function showCommits(el) {
  const owner = el.dataset.owner;
  const repo = el.dataset.repository;
  $.get(`https://api.github.com/repos/${owner}/${repo}/commits`, function(data) {
    const commitsList = `<ul>${data.map(c => '<li>' + c.sha + ' | ' + c.commit.author.name + ' | ' + c.committer.login + ' <img height="30" widht="30" src="' + c.committer.avatar_url + '">' + '</li>').join('')}</ul>`;
    document.getElementById('details').innerHTML = commitsList;
  }).fail(displayError());
}

function displayError() {
  document.getElementById('errors').innerHTML = "I'm sorry. There's been an error. Please try again.";
}


