$(document).ready(function (){
});

function renderSearchResult(result) {
  return result.items.map(repo => {
    return `
      <div>
        <h2><a href="${repo.html_url}">${repo.name}</a></h2>
        <p><a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
        <p>${repo.description}</p>
      </div>
      <hr>
    `
  })
}

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
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

function searchRepositories() {
  let search = $('#searchTerms').val();
  const url = `https://api.github.com/search/repositories?q=${search}`;
  $.get(url, data => {
    $('#results').html(renderSearchResult(data));
  }).fail(error => {
    displayError();
  })
}