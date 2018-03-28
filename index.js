$(document).ready(function (){
});

function searchRepositories() {
  const search = $('#searchTerms').val();
  $.get(`https://api.github.com/search/repositories?q=${search}`, displayRepositories)
  .fail(displayError);
}

function displayRepositories(response) {
  const responseList =
    response.items.map(r => `<h3><a href="${r.html_url}">${r.name}</a></h3>
    <ul>
      <li>${r.description}</li>
      <li><a href="${r.owner.html_url}">${r.owner.login}</a></li>
      <li><img src="${r.owner.avatar_url}"></li>
      <li><a href="#" onclick="showCommits(this)" data-repository="${r.name}" data-owner="${r.owner.login}">Show Commits</a></li>
    </ul>`);
  $('#results').html(responseList);
}

function showCommits(el) {
  const repo = el.dataset.repository;
  const username = el.dataset.owner;
  $.get(`https://api.github.com/repos/${username}/${repo}/commits`, displayCommits).fail(displayError);
}

function displayCommits(response) {
  const commitList =
    `<ul>${response.map(r => '<li>' + r.sha + ' - ' + r.commit.author.name + ' - ' + r.author.login + '</li><li><img src="' + r.author.avatar_url + '"></li>').join('')}</ul>`;
  $('#details').html(commitList);
}

function displayError(error) {
  $('#errors').html("I'm sorry, there's been an error. Please try again.");
}
