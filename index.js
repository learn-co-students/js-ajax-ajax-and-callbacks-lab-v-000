$(document).ready(function (){

});

function searchRepositories() {
  const term = document.getElementById('searchTerms').value;
  const html =  'https://api.github.com/search/repositories?q=' + term +'/';
  $.get(html, function (data) {
    $("#results").html(showRepositories(data))
  }).fail(error => displayError());
}

function showRepositories(repos) {
  return '<ul>' + repos.items.map(repo => {
    return `<li>
    <h3>${repo.name}</h3>
    <p><a href=${repo.owner.html_url}>${repo.owner.login}</a></p>
    <img src=${repo.owner.avatar_url} height="32" width="32">
    <p>Description: ${repo.description}</p>
    <p><a href=${repo.html_url}>Visit site</a></p>
    <p><a href="#" data-repo=${repo.name} data-user=${repo.owner.login} onclick="showCommits(this)">Show Commits</a></p>
    </li>`
  }).join("") + '</ul>';
}

function displayError() {
  $('#errors').html("<p>I'm sorry, there's been an error. Please try again</p>")
}

function showCommits(repo) {
  const name = repo.dataset.repo
  const owner = repo.dataset.user
  const html = `https://api.github.com/repos/${owner}/${name}/commits`
  console.log(html);
  
  $.get(html, function (data) {
    $("#details").html(displayCommit(data))
  }).fail(error => displayError());
}

function displayCommit(repos) {
  return '<ul>' + repos.map(repo => {
    return `<li>
    <h3>${repo.sha}</h3>
    <p>${repo.commit.author}</p>
    <p>${repo.author.login}</p>
    <p><img width="50px" height="50px" src="${repo.author.avatar_url}"></p>
    </li>`
  }).join("") + '</ul>';
}