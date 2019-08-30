$(document).ready(function (){
});

function searchRepositories() {
  let term = $('#searchTerms').val();
  $.get(`https://api.github.com/search/repositories?q=${term}`, function(response) {
    $('#results').html(showRepositories(response));
  }).fail(function(error) {
    displayError();
  })
}

function showRepositories(response) {
  const repoList = '<ul>' + response.items.map(r => {
    return ('<li>' + `<a href="${r.html_url}"> ${r.name} ></a>` +
      '<p>' + r.description + '</p>' +
      `<img src="${r.owner.avatar_url}">` +
      `<a href="${r.owner.url}"</a>` +
      `<a href="#" data-repository=${r.name} data-owner=${r.owner.login} onclick="showCommits(this)">Show Commits</a>` + '</li>'
    )
  }).join('') + '</ul>'
  document.getElementById("results").innerHTML = repoList
}

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

function showCommits(el) {
  const owner = el.dataset.owner
  const repo = el.dataset.repository
  $.get(`https://api.github.com/repos/${owner}/${repo}/commits`, function(response) {
    $('#details').html(displayCommits(response));
  })
}

function displayCommits(response) {
  const commitsList = `<ul>${response.map(commit =>
    '</li>' + commit.sha + commit.commit.author.name +
      commit.author.login + '<img src="${commit.author.avatar_url}">' + '</li>'
    ).join('')}</ul>`
  return commitsList
}
