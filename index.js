$(document).ready(function (){
})

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

function searchRepositories() {
  let formatRepo = (repo) => {
    return `
      <div>
        <h2><a href="${repo.html_url}"> ${repo.name} </a></h2>
          <p>${repo.description}</p>
          <h4>Owner: ${repo.owner.login}</h4>
          <p><a href="${repo.owner.html_url}">${repo.owner.html_url}</a></p>
          <p><a href="#" data-repo="${repo.name}" data-username="${repo.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
          <img src="${repo.owner.avatar_url}" height="80px">
      </div>
      <hr>
    `
  }

  let formatResults = (data) => data.items.map(repo => formatRepo(repo))

  let searchTerms = $("#searchTerms").val()
  let url = "https://api.github.com/search/repositories" + `?q=${searchTerms}`

  $.get(url, function(data) {
    $('#results').html(formatResults(data))
  }).fail(function() {
    displayError()
  })
}

function showCommits(el) {
  let formatCommit = (commit) => {
    return `<h3>${commit.sha}</h3><p>Author: ${commit.commit.author.name}</p><p>Message: ${commit.commit.message}</p>`
  }

  let formatCommits = (data) => data.map(commit => formatCommit(commit))

  let owner = el.dataset.username
  let repo = el.dataset.repo
  let url = `https://api.github.com/repos/${owner}/${repo}/commits/`
  console.log(url)
  $.get(url, function(data) {
    console.log(data)
    $('#details').html(formatCommits(data))
  })
}
