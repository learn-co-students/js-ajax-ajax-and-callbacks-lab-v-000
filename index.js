
var renderSearchResult = function(result) {
  return `
<div>
  <h2><a href="${result.html_url}">${result.name}</a></h2>
  <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
  <p>${result.description}</p>
</div>`
}

var renderCommit = function(commit) {
   return `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
}

var renderCommits = function(data) {
  let result = data.map((commit)=>renderCommit(commit)).join('')
  return `<ul>${result}</ul>`
}

var showCommits = function(el) {
    $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`,function(data) {
    $('#details').html(renderCommits(data))
    }).fail(function(error) {
    displayError()
  })
}

var renderSearchResults = (data) => data.items.map( result => renderSearchResult(result))

var displayError = function() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

var searchRepositories = function() {
  const searchTerms = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(data) {
    $(`#results`).html(renderSearchResults(data))
  }).fail(function(error) {
    displayError()
  })
}

$(document).ready(function (){
});

