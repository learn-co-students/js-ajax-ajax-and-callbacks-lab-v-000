function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

function renderSearchResult(result) {
  return `
    <div>
      <h2><a href="${result.html_url}">${result.name}</a></h2>
      <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this);">Show Commits</a></p>
      <p><img src="${result.owner.avatar_url}" height="32" width="32"></p>
      <p>${result.description}</p>
    </div>
    <hr>
  `
}

function renderSearchResults(data) {
  return data.items.map(function(result) {
    return renderSearchResult(result);
  })
}

function searchRepositories() {
  const searchTerms = $('#searchTerms').val();

  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(data) {
    $('#results').html(renderSearchResults(data))
  }).fail(function(error) {
    displayError();
  })
}

function renderCommit(commit) {
  return `
    <li><h3>${commit.sha}</h3></li>
    <p>${commit.commit.author.name} (${commit.author.login})</p>
    <img src="${commit.author.avatar_url}" height="32" width="32">
    `;
}

function renderCommits(data) {
  let result = data.map(function(commit) {
    return renderCommit(commit)
  }).join('');

  return `<ul>${result}</ul>`;
}

function showCommits(el) {
  const username = el.dataset.owner;
  const repository = el.dataset.repository;

  $.get(`https://api.github.com/repos/${username}/${repository}/commits`, function(data) {
    $('#details').html(renderCommits(data))
  }).fail(function(error) {
    displayError();
  })
}
$(document).ready(function (){
});
