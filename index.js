$(document).ready(function (){



});

function searchRepositories() {
  let searchTerm = document.getElementById('searchTerms').value
  let url = `https://api.github.com/search/repositories?q=${searchTerm}`
  $.get(url).done(function(data) {
    let repoList = `<ul>${ data.items.map(repo => '<li><a href="#" data-owner="' + repo.owner.login + '" data-repository="' + repo.name + '" onclick="showCommits(this)">' + repo.name + '</a></li>').join('') }</ul>`
    console.log(data.items);
    $('#results').html(repoList)
  }).fail(function(error) {
    // This is called when an error occurs
    displayError(error)
  });
}

function showCommits(el) {
  let repo = el.dataset.repository
  let owner = el.dataset.owner
  let url = `https://api.github.com/repos/${owner}/${repo}/commits`

  $.get(url).done(function(data) {
    console.log(data);
    let commitsList = `<ul>${ data.map(commit => '<li>' + commit.commit.message + ' (' + commit.sha + ')</li>').join('') }</ul>`
    console.log(data);
    $('#details').html(commitsList)
  }).fail(function(error) {
    displayError(error)
  });
}

function displayError(error) {
  $('#errors').html('<h2>error</h2>')
}
