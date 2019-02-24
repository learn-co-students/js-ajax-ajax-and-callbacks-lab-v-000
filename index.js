$(document).ready(function (){

});

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.");
}

function renderItems(item) {
    return `<h1>${$('#searchTerms').val()}</h1>
      <h2>${item.name}</h2>
      <p>${item.description}</p>
      <a href="${item.html_url}">View on Github</a>
      <a href="#" data-repository="${item.name}" data-owner="${item.owner.login}" onclick="showCommits(this)">View Commits</a>
      <hr>`
}

function renderResults(data) {
  return data.items.map(item => renderItems(item));
}

function searchRepositories() {
  const term = $('#searchTerms').val();
  $.get(`https://api.github.com/search/repositories?q=${term}`, function(response) {
    $('#results').html(renderResults(response))
  }).fail(displayError());
}

function renderCommit(data) {
  return `
    <p>${data.sha}</p>
    <strong><p>${data.author.name}</p></strong>
    <p>${data.author.login}</p>
    <img src="${data.avatar_url}">
    <hr>
  `
}
function renderCommits(data) {
  return data.map(item => renderCommit(item))
}

function showCommits(item) {
  console.log(item)
  $.get(`https://api.github.com/repos/${item.dataset.owner}/${item.dataset.repository}/commits`, function(response) {
    $('#details').html(renderCommits(response))
  }).fail(displayError());
}
