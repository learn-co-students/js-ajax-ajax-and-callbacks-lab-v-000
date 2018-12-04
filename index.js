$(document).ready(function (){

});

function displayRepositories(data) {
  const repos = data.items;
  const src = document.getElementById('repository-template').innerHTML;
  const template = Handlebars.compile(src);
  const repoList = template(repos);
  document.getElementById('results').innerHTML = repoList;
}

function searchRepositories() {
  $.get('https://api.github.com/search/repositories?q=' + searchTerms.value,
  function(data) {
    displayRepositories(data);
  }).fail(function(error) {
    displayError();
  });
}

function displayError() {
  document.getElementById('errors').innerHTML = "I'm sorry, there's been an error. Please try again.";
}

function showCommits(el) {
  const repo = el.dataset.repository;
  const owner = el.dataset.owner;
  $.get('https://api.github.com/repos/' + owner + '/' + repo + '/commits').done(function(data) {
    const commits = data;
    const src = document.getElementById('commit-template').innerHTML;
    const template = Handlebars.compile(src);
    const commitList = template(commits);
    document.getElementById('details').innerHTML = commitList;
  }).fail(function(error) {
    displayError();
  });
}
