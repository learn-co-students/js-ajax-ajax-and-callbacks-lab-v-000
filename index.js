function displayError() {
  $('#errors').html("There has been an error. Please try again.")
}

function searchRepositories() {
  let searchTerms = $('#searchTerms').val();
  let url = `https://api.github.com/search/repositories?q=${searchTerms}/`
  $.get(url, function(response){
      $("#results").html(showRepositories(response))
  }).fail(error =>{
      displayError();
  });
}

function showRepositories(response) {
  let repos = response.items.map(repo => renderRepositories(repo))
  return `<ul>${repos}</ul>`
}

function renderRepositories(repo) {
  return `<li><b>Name: </b><spanp>${repo.name}</span><br>
  <b>Description: </b><span>${repo.description}</span><br>
  <b>URL: </b><span>${repo.html_url}</span>
  <p><a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
  </li><br>`
}

function showCommits(repo) {
  $.get(`https://api.github.com/repos/${repo.dataset.owner}/${repo.dataset.repository}/commits`, data => {
    $('#details').html(renderCommits(data))
  }).fail(error => {
    displayError();
  });
}

var renderCommit = (commit) => {
return `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
}

function renderCommits(data) {
  let result = data.map(commit => renderCommit(commit)).join('')
  return `<ul>${result}</ul>`
}

$(document).ready(function () {
});
