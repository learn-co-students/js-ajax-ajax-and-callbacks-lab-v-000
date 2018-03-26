$(document).ready(function (){

});

function searchRepositories() {
  let searchTerms = document.getElementById('searchTerms').value;
  let url = `https://api.github.com/search/repositories?q=${searchTerms}`;
  $.get(url)
    .done(function(response) {
      let formatData = response.items.map(data => { return (
        `<strong><a href="${data.html_url}">${data.name}</a></strong><br>
        <em>${data.description}</em><br>
        <small><a href="#" data-repository="${data.name}" data-owner="${data.owner.login}" onclick="showCommits(this)">Show Commits</a></small><br>
        <img src="${data.owner.avatar_url}" width="32px"><br>
        <a href="${data.owner.url}">${data.owner.login}</a>
        `
      )})
      $('#results').html(formatData);
    })
    .fail(function(error) {
      displayError();
    });
}

function showCommits(el) {
  let repo = el.dataset.repository;
  let owner = el.dataset.owner;
  let url = `https://api.github.com/repos/${owner}/${repo}/commits`;
  $.get(url)
    .done(function(response) {
      let formatData = response.map(data => { return (
        `${data.sha}<br>
         ${data.commit.message}<br>
         <img src="${data.author.avatar_url}" width="32px"><br>
         By ${data.commit.author.name} (<a href="${data.author.url}">${data.author.login}</a>
        `
      )})
      $('#details').html(formatData);
    })
    .fail(function(error) {
      displayError();
    })
}

function displayError() {
  let errorMessage = "I'm sorry, there's been an error. Please try again.";
  $('#errors').html(errorMessage)
}