$(document).ready(function (){
});

function displayError() {
  $('errors').html("Sorry, there was an error. Please try again.")
}

function searchRepositories() {
  const searchTerms = $('#searchTerms').val();
  const url = 'https://api.github.com/search/repositories?q=${searchTerms}/'
  $.get(url, function(response) {
    $("#results").html(showRepositories(response))
  }).fail(error => {
    displayError()
  })
}

function showRepositories(response) {
  const repos = response.items.map( result => displayRepositories(result))
  return `<ul>${repos}</ul>`
}

function displayRepositories(result) {
  return `
    <h1><a href="${result.html_url}">${result.name}</a></h1><br>
    <p>Decription: <span>${result.description}</span></p><br>
    <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p><br>
  `
}

function showCommits(result) {
  $.get(`https://api.github.com/repos/${result.dataset.owner}/${result.dataset.repository}/commits`, data => {
    $('#details').html(displayCommits(data))
  }).fail(error => {
    displayError()
  })
}

function displayCommits(data) {
  const commits = data.map(commit => renderCommit(commit))
  return `<ul>${commits}</ul>`
}

function renderCommit(commit) {
  return `<li>${commit.sha} -  ${commit.commit.message}</li>`
}
