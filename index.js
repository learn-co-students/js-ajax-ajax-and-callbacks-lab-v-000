$(document).ready(function (){

});

function searchRepositories() {
  let term = document.getElementById('searchTerms').value;
  $.get(`https://api.github.com/search/repositories?q=${term}`).done(function(data) {
    const result = data.items.map(r => `<div>
      <h2><a href="${r.html_url}">${r.name}</a></h2>
      <p><a href="#" data-repository="${r.name}" data-owner="${r.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
      </div>`)
    $('#results').html(result);
  }).fail(error => {
    displayError()
  });
}

function showCommits(el) {
  const repo = el.dataset.repository;
  const user = el.dataset.owner;
  $.get(`https://api.github.com/repos/${user}/${repo}/commits`).done(function(data) {
    const result = data.map(r => `<div>
      <p>${r.commit.message}</p>
      <p>${r.sha}</p>
      <p>${r.author.name}</p>
      </div>`)
    $('#details').html(result);
  }).fail(error => {
    displayError()
  });
}

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.");
}
