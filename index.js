function searchRepositories() {
  const searchTerms = $('#searchTerms').val()

  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
    $('#results').html(renderResults(data)).fail(error => displayError())
  })
}

$(document).ready(function (){})

function renderResults(data) {
  return data.items.map(result => renderResult(result))
}

function renderResult(result) {
  return `
  <div>
    <strong><p>${result.name}(Owner: ${result.owner.login})</p></strong>
    <p>${result.description}</p>
    <div><img src=${result.owner.avatar_url}></div>
    <a href=${result.html_url}>See Full Repo Here</a><br>
    <a href="#" data-repository=${result.name} data-owner=${result.owner.login} onclick="showCommits(this)">Show Commits</a>
  </div>
  `
}

function showCommits(el) {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
    $('#details').html(renderCommits(data)).fail(error => displayError())
  })
}

function renderCommits(data) {
  let result = data.map(commit => renderCommit(commit)).join('')
  return `<ul>${result}</ul>`
}

function renderCommit(commit) {
  return `<li>  ${commit.sha}<br> ${commit.commit.author.name}(Username:${commit.author.login}) <div><img src=${commit.author.avatar_url}></div></li>`
}

function displayError() {
  $('#errors').html("There was an error. Please try again.")
}
