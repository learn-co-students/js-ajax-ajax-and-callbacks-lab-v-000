$(document).ready(function (){

});

function searchRepositories() {
  const searchTerms = document.getElementById('searchTerms').value
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(response) {

    $("#results").html(showRepositories(response));
  })
}

function showRepositories(response) {
  const repoList =
  `<ul>${response.items.map(repo => {
    return (
      `<li>
        <h1>${repo.name}</h1>
        <p>${repo.description}</p>
        <a href="${repo.html_url}">${repo.html_url}</a>
        <p>${repo.owner.login}</p>
        <img src="${repo.owner.avatar_url}" height="32" width="32">
        <a href="${repo.owner.url}">${repo.owner.url}</a>
        <a href="#" id="${repo.commits_url}" onClick="getCommits(this)">Show Commits</a>
      </li>`)}).join('')}
  </ul>`
  return repoList
}


function getCommits(repo) {
  url = repo.id.slice(0, -6)
  $.get(url, function(response) {
    $("#details").html(showCommits(response));
  })
}

function showCommits(response) {
  const commitsList = response.map(commit => {
    return showCommit(commit)
  }).join('')
  return `<ul>${commitsList}</ul>`
}

function showCommit(commit) {
  return `<li><p>${commit.sha}</p><p>${commit.commit.message}</p></li>`
}

function displayError() {
    $("#errors").html("I'm sorry, there's been an error. Please try again.");
}
