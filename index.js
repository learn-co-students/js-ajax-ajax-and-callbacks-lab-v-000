$(document).ready(function (){
});

function searchRepositories() {
  const terms = document.getElementById("searchTerms").value
  $.get(`https://api.github.com/search/repositories?q=${terms}`, data => {
    $('#results').html(showRepositories(data))
  }).fail(error => {
    displayError
  })
}

function showRepositories(data) {
   data.items.map(result => {
    `<div>
      <h2><a href="${result.html_url}">${result.name}</a></h2>
      <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
      <p>${result.description}</p>
    </div>`
  })
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
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}
