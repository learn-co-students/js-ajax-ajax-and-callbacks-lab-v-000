var displayError = () => {
  // Get div #errors and assign html string to it.
  $('#errors').html('There has been an error. Please try again.')
}

var displaySearchResult = (r) => {
  return `
          <div>
            <h2><a href="${r.html_url}">${r.name}</a><h2>
            <p><a href="#" data-repository="${r.name}" data-owner="${r.owner.login}" onclick="showCommits(this);">Show Commits</a></p>
            <p>${r.description}</p>
            <p><img src=${r.owner.avatar_url}</p>
          </div>
          `
}

var searchRepositories = () => {
  let searchTerms = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(response) {

    let repoResults = `${response.items.map(r => displaySearchResult(r)).join('')}`
    
    $('#results').html(repoResults)

  }).fail(displayError)
}

var displayCommits = (r) => {
  return `
          <div>
            <p>SHA: ${r.sha}</p>
            <p>Author: ${r.commit.author.name}</p>
            <p>Author Login: ${r.author.login}</p>
            <p><img src=${r.author.avatar_url}</p>
          </div>
          `
}

var showCommits = (el) => {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, function (response) {

    let commitResults = `${response.map(r => displayCommits(r)).join('')}`

    $('#details').html(commitResults)

  }).fail(displayError)
}


$(document).ready(function (){
});
