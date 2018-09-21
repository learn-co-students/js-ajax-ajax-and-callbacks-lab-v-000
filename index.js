$(document).ready(function (){
});

function searchRepositories() {
  const searchTerm = document.getElementById("searchTerms").value;
  $.get(`https://api.github.com/search/repositories?q=${searchTerm}`, function(data) {
    $('#results').html(data.items[0].name);
  }).fail(function(error) {
      displayError(error);
  });
}

function showCommits(el) {
  const repo = el.dataset.repository;
  const owner = el.dataset.owner;
  $.get(`https://api.github.com/repos/${owner}/${repo}/commits`, function(data) {
    $('#details').html(data[0].sha);
  }).fail(function(error) {
      displayError(error);
  });
}

function displayError(error) {
  $('#errors').html("I'm sorry, there's been an error. Please try again.");
}
