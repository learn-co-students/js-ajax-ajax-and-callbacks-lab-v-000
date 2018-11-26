$(document).ready(function (){
});

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.");
}

function individualCommit(result) {
  return `<div>
    <p>SHA: ${result.sha}</p>
    <p>Author: ${result.author.login}</p>
    <p><img src="${result.author.avatar_url}" alt="avatar"></p>
  </div>`
}

function displayCommits(data) {
  return data.items.map( (result) => individualCommit(result) );
}

function showCommits(el) {
  debugger
  const username = el.dataset.username;
  const name = el.dataset.repository;
  $.get(`https://api.github.com/repos/${username}/${name}/commits`, function(data) {
    $("#details").html(displayCommits(data));
  }).fail(function(error) {
    displayError();
  })
}

function individualRepository(result) {
  return `<div><p><a href="${result.html_url}">${result.name}</a></p><p>Repository Owner: <a href="${result.owner.url}">${result.owner.login}</a></p><p><img src="${result.owner.avatar_url}" alt="Image avatar"></p><p><a href="#" onclick="showCommits(this);return false" data-username="${result.owner.login}" data-repository="${result.name}">Get Commits</a></p></div>`
}

function displayRepositories(data) {
  return data.items.map( (result) => individualRepository(result) );
}

function searchRepositories () {
  let searchTerms = document.getElementById('searchTerms').value;
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(data) {
    $('#results').html(displayRepositories(data));
  }).fail(function(error){
    displayError();
  })
}
