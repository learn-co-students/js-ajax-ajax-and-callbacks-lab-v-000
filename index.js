function displayError() {
  // The tests wants a Jquery call from $('#errors').html with a phrase in quotes that has error in it
  $('#errors').html('error')
}

var renderCommit = (commit) => {
  // Shows how each commit will be displayed
  return `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
}

var renderCommits = (data) => {
  // Iterate through the input data of the commits and show under results id
  let result = data.map((commit)=>renderCommit(commit)).join('')
  return `<ul>${result}</ul>`
}

var showCommits = (el) => {
  // Load data from the server using a HTTP GET Request to grab the github api from the specific Repo Owner, their repository, and their commits
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
    $('#details').html(renderCommits(data))
  }).fail(error => {
    displayError()
  })
}

var renderSearchResult = (result) => {
  // Print outs the repositories API information with the specific data we want.
  return `
      <div>
        <h2><a href="${result.html_url}">${result.name}</a></h2>
        <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
        <p>${result.description}</p>
      </div>
      <hr>
    `
}

// Iterate through the data set to print out the respository data
var renderSearchResults = (data) => data.items.map( result => renderSearchResult(result))

var searchRepositories = () => {
  const searchTerms = $('#searchTerms').val()
  // Load data from the server using a HTTP GET Request with the specific searchTerm
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
    // Using a callback function here to use show the search results
      $('#results').html(renderSearchResults(data))
    }).fail(error => {
      displayError()
    })
}

$(document).ready(function (){
});
