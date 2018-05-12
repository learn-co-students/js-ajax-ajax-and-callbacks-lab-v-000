$(document).ready(function (){

 
});

function searchRepositories() {
  searchTerms = $('#searchTerms')[0].value;
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(response){
  let repoList = '<ul>' + response.items.map(r => {
    return(`
      <li>
        <h3>${r.name}</h3>
        <p>${r.description}</p>
        <a href='${r.html_url}'>See it on Github</a>
        <p>Owner: <a href='${r.owner.html_url}'>${r.owner.login}</a></p>
        <img src='${r.owner.avatar_url}' width='100'><br>
        <a href='#' onclick='showCommits(this)' data-owner='${r.owner.login}' data-repository='${r.name}'>Show Commits</a>
      </li>
    `)
  }).join('') + '</ul>';
  $('#results').html(repoList);
  }).fail(displayError)
}

function showCommits(el) {
  let repository = el.dataset.repository
  let username = el.dataset.owner
  $.get(`https://api.github.com/repos/${username}/${repository}/commits`, function(response) {
    console.log(response)
    let commitList = '<ul>' + response.map(r => {
    return (`
      <li>
        <p>SHA: ${r.sha}</p>
        <p>Author: ${r.author.name}</p>
        <p>Author's Login: ${r.author.login}</p>
        <img src='${r.author.avatar_url}' width='100'>
      </li>
    `)}).join('') + '</ul>'
    $('#details').html(commitList)
    console.log(commitList)
  }).fail(displayError)
}

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}