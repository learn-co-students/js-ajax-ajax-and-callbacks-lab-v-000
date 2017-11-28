$(document).ready(function (){
});

function displayError(){
  $('#errors').html("I'm sorry, there's been an error. Please try again.");
};

function searchRepositories(){
  const searchTerms = document.getElementById('searchTerms').value
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(response){
    $('#results').html(displayRepositories(response))
  }).fail(displayError())
};

function displayRepositories(data){
  return data.items.map(item =>
    `<div>
        <h2><a href="${item.html_url}">${item.name}</a></h2>
        <p>${item.description}</p>
        <img src="${item.owner.avatar_url}" alt="${item.owner.login}">
        <a href="${item.owner.html_url}">${item.owner.login}</a>
        <p><a href="#" data-repository="${item.name}" data-owner="${item.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
      </div>`)
};

function showCommits(item){
  $.get(`https://api.github.com/repos/${item.dataset.owner}/${item.dataset.repository}/commits`, function(response){
    $('#details').html(displayCommits(response))
  }).fail(displayError())
};

function displayCommits(data){
  return data.map(commit =>
    `<div>
        <h2>${commit.sha}</h2>
      </div>`)
};
