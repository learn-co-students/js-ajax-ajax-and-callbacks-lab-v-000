$(document).ready(function (){
});
function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
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

var renderSearchResults = (data) => data.items.map( result => renderSearchResult(result))

function searchRepositories() {
  const searchTerms = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
      $('#results').html(renderSearchResults(data))
    }).fail(error => {
      displayError()
    })
}

var renderCommits = (data) => data.map( commit => renderCommit(commit))

function showCommits(el) {
   $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
     $( "#details" ).html( renderCommits(data) );
     }).fail(function(error) {
       displayError();
     console.log("I'm sorry, there's been an error. Please try again.");
     });
     }


     function renderCommit(commit) {
        return `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p><p>${commit.author.login}</p><p>${commit.commit.author.name}</p><img src=${commit.commit.author.name.avatar}></p>${commit.commit.message}</p></li>`
     }
