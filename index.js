
$(document).ready(function (){
});

function searchRepositories() {
  // https://api.github.com/search/repositories?q=tetris
    const root_url = "https://api.github.com/search/repositories?q="
    let searchTerms = $('#searchTerms').val()
    let requestURL = `${root_url}${searchTerms}`
    $.get(requestURL, data => {
      $('#results').html(renderSearchResults(data))
  }).fail(error => {
      displayError()
    });
}

function renderSearchResults(data) {
  return data.items.map(result => renderSearchResult(result));
}

function renderSearchResult(result) {
  return `
    <div>
      <h2><a href="${result.html_url}">${result.name}</a></h2>
      <p><a href="#" onclick="showCommits(this)">Show Commits</a></p>
      <p>${result.description}</p>
    </div>
    <hr>
  `
}

function renderCommit(commit) {
  return `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
}

function renderCommits(data) {
  let result = data.map((commit)=>renderCommit(commit)).join('')
  return `<ul>${result}</ul>`
}

function showCommits(el) {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
    $('#details').html(renderCommits(data))
  }).fail(error => {
    displayError()
  })
}

function displayError() {
  return $('#errors').html("I'm sorry, there's been an error. Please try again.");
}
