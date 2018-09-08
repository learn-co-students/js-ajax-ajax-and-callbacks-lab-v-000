$(document).ready(function (){
  $('button').on('click', function() {
    console.log('button clicked')
  })
});

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

function searchRepositories() {
  const searchTerm = $('#searchTerms').val() //get value of the search term inputted
  console.log(searchTerm)
  $.get(`https://api.github.com/search/repositories?q=${searchTerm}`).done(function(data){
    console.log(data)
    data.items.forEach(function(repo) {
      $('#results').append(`<div>
        <h1>Repository name: ${repo.name}</h1>
        <p>Description: ${repo.description}</p>
        <a href="${repo.html_url}" target="_blank">${repo.html_url}</a>
        <h2>Repository owner: ${repo.owner.login}</h2>
        <img src="${repo.owner.avatar_url}">
        <a href="${repo.owner.html_url}" target="_blank">${repo.owner.html_url}</a>
        <a href="#" onclick="showCommits(this)" data-owner="${repo.owner.login}" data-repository="${repo.name}">Show Commits</a>
        </div>`)
    })
  })
}

function showCommits(repo) {
  const repository = repo.dataset.repository
  const repoOwner = repo.dataset.owner
  $.get(`https://api.github.com/repos/${repoOwner}/${repository}/commits`).done(function(commits){
    commits.forEach(function(commit) {
      console.log(commit)
      $('#details').append(`<div>
        <p>SHA: ${commit.sha}</p>
        <p>Author: ${commit.commit.author.name}</p>
        <p>Author login: ${commit.author.login}</p>
        <img src="${commit.author.avatar_url}">
        </div>`)
    })
  })
}
