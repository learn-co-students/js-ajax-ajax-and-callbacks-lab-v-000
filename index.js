$(document).ready(function (){
});

function searchRepositories(){
  let searchTerm = document.getElementById('searchTerms').value
  $.get(`https://api.github.com/search/repositories?q=${searchTerm}`, displayRepositories).fail(displayError)
}


function displayRepositories(response) {

  let repos = response.items.map(r => {
    return `<li><a href=${r.html_url}>${r.name}</a></li>
    <p>${r.description}</p>
    <ul>
      <li>Created By: <a href=${r.owner.html_url}>${r.owner.login}</a></li>
      <img src=${r.owner.avatar_url} height="32" width="32">
      <li><a href='#'
      data-repository="${r.name}"
      data-owner="${r.owner.login}"
      onclick='getCommits(this)'> Show Commits </a></li>
    </ul>`
  }).join('')

  let repoList = `<ul>${repos}</ul>`

  document.getElementById("results").innerHTML = repoList
}

function showCommits(el) {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`,
  displayCommits).fail(displayError)
}

function displayCommits(response){

  let list = response.map(c => {
    return `<li>Author: ${c.commit.author.name}<br>
    <img src=${c.commit.author.avatar_url} height="32" width="32">
    <p>Login: ${c.author.login}</p>
    <p>SHA: ${c.sha}</p></li>`
    }).join('')
  let commitList = `<ul>${list}</ul>`

  document.getElementById("details").innerHTML = commitList

}

function displayError() {
  $("#errors").html("I'm sorry, there's been an error. Please try again.")
}
