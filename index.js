$(document).ready(function (){
});

function searchRepositories() {
  const searchTerms = $("#searchTerms").val()

  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(response) {
    const items = response.items

    const html = items.map(function(repo) {
      return `<div>
                <h2><a target="_blank" href="${repo.html_url}">${repo.name}</a></h2>
                <p>${repo.description}</p>
                <header><h4>Created By: ${repo.owner.login}</h4></header>
                <img src="${repo.owner.avatar_url}" height="32" width="32">
                <a target="_blank" href="${repo.owner.html_url}">Github Profile</a>
                <a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}" onclick="showCommits(this)">Show Commits</a>
              </div>`
    })

    $("#results").html((html))
  }).fail(function(error) {
    displayError(error)
  })
}

function displayError(error) {
  $("#errors").html("I'm sorry, there's been an error. Please try again.")
}

function showCommits(element) {
  $.get(`https://api.github.com/repos/${element.dataset.owner}/${element.dataset.repository}/commits`, function(commits) {

    const html = commits.map(function(commit) {
      return `<div>
                <h2>Author: ${commit.author.login}</a></h2>
                <header><h4>${commit.sha}</h4></header>
                <img src="${commit.author.avatar_url}" height="32" width="32">
              </div>`
    })

    $("#details").html((html))
  })
}
