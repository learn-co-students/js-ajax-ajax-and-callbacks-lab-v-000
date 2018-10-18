function displayError(){
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

  function searchRepositories(){
    const searchTerms = $('#searchTerms').val();
    $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(data){
      $('#results').html(renderSearchResults(data))
    }).fail(error => {
      displayError()
    })
  }

  var renderSearchResult = (result) => {
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
  return data.items.map(item => renderSearchResult(item))
}

function showCommits(el){
  const owner = el.dataset.owner
  const repository = el.dataset.repository
  $.get(`https://api.github.com/repos/${owner}/${repository}/commits`, data => {
    $('#details').html(renderCommits(data))
  }).fail(error => {
    displayError()
  })
}

function renderCommit(c){
  return `
    <div>
      <p>SHA: ${c.sha}</p>
      <p>Author: ${c.commit.author.name}</p>
      <p>Username: ${c.commit.author.login}</p>
      <img src='${c.commit.author.avatar_url}'>
    </div>
    `
}

function renderCommits(data){

  return data.map(commit => renderCommit(commit))
}


$(document).ready(function (){

});
