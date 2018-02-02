function searchRepositories() {
  const searchTerms = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(data) {
      $('#results').html(displaySearchResults(data))
    }).fail(displayError);
}

var displaySearchResults = (data) => data.items.map( result => displaySearchResult(result))

function displaySearchResult(result) {
  return `
          <div>
            <h2><a href="${result.html_url}">${result.name}</a></h2>
            <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
            <p>${result.description}</p>
            <p><img src="${result.owner.avatar_url}"><p/>
          </div>
        `
}

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

function showCommits(el) {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, function(data) {
    $('#details').html(displayCommits(data))
  }).fail(displayError);
}

function displayCommits(data) {
  let result = data.map((commit)=>displayCommit(commit)).join('')
  return `<ul>${result}</ul>`
}

function displayCommit(commit) {
  return `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
}

$(document).ready(function (){
});
