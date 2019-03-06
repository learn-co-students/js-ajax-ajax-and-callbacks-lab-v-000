$(document).ready(function (){

});

function htmlSearchResults(response) {
  const src = document.getElementById('repository-template').innerHTML;
  const template = Handlebars.compile(src);
  return template(response.items);
}

function htmlCommits(response) {
  const src = document.getElementById('commits-template').innerHTML;
  const template = Handlebars.compile(src);
  return template(response);
}

function searchRepositories() {
  let repo = document.getElementsByTagName('input')[0].value;
  $.get(`https://api.github.com/search/repositories?q=${repo}`, function(response) {
    console.log(response);
    $('#results').html(htmlSearchResults(response));
  }).fail(function(error) {
    displayError();
  });
}

function showCommits(el) {
  let repo = el.dataset.repository;
  let owner = el.dataset.owner;
  $.get(`https://api.github.com/repos/${owner}/${repo}/commits`, function(response) {
    $('#details').html(htmlCommits(response));
  }).fail(function(error) {
    displayError();
  });
}

function displayError() {
  $('#errors').html(`I'm sorry, there's been an error. Please try again.`);
}
