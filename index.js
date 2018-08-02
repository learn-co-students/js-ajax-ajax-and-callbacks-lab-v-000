
// Error Message
function displayError(){
  const errorMessage = "I'm sorry, there's been an error. Please try again."
  $('#errors').html(errorMessage)
  console.log(`Something went wrong: ${errorMessage}`);
}

//Query GitHub API Based on Search Term

function searchRepositories() {
  const searchTerm = $('#searchTerms').val()
  const url = `https://api.github.com/search/repositories?q=${searchTerm}`

  $.get(url, function(data) {
    $('#results').html(showRepositories(data))
  }).fail(error => {displayError()})

}

//Return a String With A <ul> and List Items For Each Repo

function showRepositories(data) {
  const repos = data.items.map(repo => renderRepositories(repo)).join('')
  return `<ul>${repos}</ul>`
}

//Function Used Within Map on Show Repos to Create List Items

function renderRepositories(repo){
   return `<li>
    <strong>Name: </strong><span>${repo.name}</span><br>
    <strong>Description: </strong><span>${repo.description}</span><br>
    <strong>URL: </strong><span><a href="${repo.html_url}">${repo.html_url}</a></span>
    <p>
    <a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}" data-commits="${repo.commits_url}" onclick="showCommits(this)">Show Commits</a>
    </p>
    </li><br>`
  }

//Make Request to GitHub API to Get Commits for Specific Repo

function showCommits(repo) {

  const user = repo.dataset.owner
  const repository = repo.dataset.repository
  const url = `https://api.github.com/repos/${user}/${repository}/commits`


  $.get(url, function(data) {
    $('#details').html(getCommits(data))
  }).fail(error => {displayError()})


}

//Provide List Items with Details From Each Commit

function getCommits(data) {

  const commits = data.map(commit =>
    `<li>${commit.sha}</li>
    <li>${commit.commit.author.name}</li>
    <li>${commit.author.login}</li>
    <li><img src="${commit.author.avatar_url} height="32" width="32"/></li>`

  ).join('')


    return `<ul>${commits}</ul>`
}





$(document).ready(function (){
});
