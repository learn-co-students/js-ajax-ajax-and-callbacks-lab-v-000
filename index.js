

function searchRepositories (){
    const repoName = $('#searchTerms').val()
    $.get(`https://api.github.com/search/repositories?q=${repoName}`, function( data ) {
        $('#results').html(renderSearchResults(data))
    }).fail(error => {
      displayError()
    });
}

function renderSearchResults(data){
  return data.items.map( result => renderSearchResult(result))
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


function  showCommits(el) {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
    $('#details').html(renderCommits(data))
  })
}

function renderCommits(data) {
  return data.map( result => renderCommit(result))
}

function renderCommit(result){
  return `
    <div>
      <h2>${result.sha}</h2>   list the SHA,
       the author
      the author's login<p>${result.commit.author.login}</p>
      <p>${result.commit.message}</p>
    , , and the author's avatar as an image.
    </div>`
}

function displayError(){
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

$(document).ready(function (){
});
