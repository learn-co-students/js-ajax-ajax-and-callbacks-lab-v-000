$(document).ready(function (){

});


function displayError(){
  $("#errors").html("I'm sorry, there's been an error. Please try again.")
}

function renderSearchResult(result) {
  return `
      <div>
        <h2><a href="${result.html_url}">${result.name}</a></h2>
        <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
        <p>${result.description}</p>
      </div>
      <hr>
    `
}

function renderSearchResults(data){
  return data.items.map( result => renderSearchResult(result))
}

function renderCommit(commit){
  return `
      <div>
        <h2>${commit.sha}</h2>
        <img src="${commit.author.avatar_url}">
        <p>${commit.author.login}</p>

      </div>

    `

}

function renderCommits(data){

  return data.map( commit => renderCommit(commit))
}

function searchRepositories() {
  const searchTerms = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(data) {
      $('#results').html(renderSearchResults(data))
    }).fail(function() {
      displayError();
    })
}

function showCommits(commit){
  const repo = commit.dataset.repository;
  const owner = commit.dataset.owner;

  $.get(`https://api.github.com/repos/${owner}/${repo}/commits`, function(data){

    $("#details").html(renderCommits(data));

  }).fail(function(){
    displayError();
  })

}
