$(document).ready(function (){
});

function searchRepositories() {
  const searchTerms = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, (data) =>{
    $('#results').html(showRepositories(data))
  }).fail(displayError())
}

function showRepositories(result) {
  let repos = '<ul>' + result.items.map(result => {
    return ( `<li>
      <a href="${result.html_url}">${result.name}</a>
      <p>${result.description} ${result.owner.url} ${result.owner.login}</p>
      <img src="${result.owner.avatar_url}">
      <a href="#" data-respository="${result.name}" data-owner="${result.owner.login}" onClick="showCommits(this)">Show Commits</a>
      </li>`)
  }).join('') + '</ul>'
  return repos
}

function showCommits(n) {
  $.get(`https://api.github.com/repos/${n.dataset.owner}/${n.dataset.repository}/commits`, data => {
    $('#details').html(displayCommits(data))
  }).fail(error => { displayError() })
}

function displayCommits(data) {
  const commits = data.map(c => {
    return `<h3>${c.sha}</h3> <p>${c.commit.message}</p>`
  })
  return commits
}

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}
