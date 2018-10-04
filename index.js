$(document).ready(function (){
});

function searchRepositories(){
  const term = document.getElementById('searchTerms').value
  const url = `https://api.github.com/search/repositories?q=${term}`
  $.get(url, function(response){
    $('#results').html(getSearchResults(response))
  }).fail(displayError())
}

function getSearchResults(data){
  return data.items.map(item =>
    `
      <div>
        <h2><a href="${item.html_url}">${item.name}</a></h2>
        <p>${item.description}</p>
        <img src="${item.owner.avatar_url}" alt="${item.owner.login}">
        <a href="${item.owner.html_url}">${item.owner.login}</a>
        <p><a href="#" data-repository="${item.name}" data-owner="${item.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
      </div>
    `)
}

function showCommits(item){
  const url = `https://api.github.com/repos/${item.dataset.owner}/${item.dataset.repository}/commits`
  $.get(url, function(response){
    $('#details').html(displayCommits(response))
  }).fail(displayError())
}

function displayCommits(data){
  return data.map(commit =>
    `
      <div>
        <h2>${commit.sha}</h2>
      </div>
    `)
}

function displayError(){
  $('#errors').html(`There's been an error, please try again.`)
}
