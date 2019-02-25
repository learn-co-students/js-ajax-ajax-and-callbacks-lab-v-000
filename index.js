function searchRepositories() {
  const searchTerms = $('#searchTerms').val()
  const searchPath = "https://api.github.com/search/repositories?q="
  $.get(`${searchPath}`+`${searchTerms}`, data => {
      $('#results').html(showSearchResults(data))
    }).fail(error => {
      displayError()
    })
}


const showSearchResults = (data) => data.items.map(result => renderSearchResult(result))

const renderSearchResult = (result) => {
  return `
    <div>
      <h2><a href="${result.html_url}">${result.name}</a></h2>
      <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
      <p>${result.description}</p>
    </div>`
}

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}


function showCommits(el) {
  const repoPath = "https://api.github.com/repos"
  $.get(`${repoPath}/` + `${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
    $('#details').html(renderCommits(data))
  }).fail(function(error) {
    displayError()
  })
}

function renderCommits(data) {
  let result = data.map(
    (commit) =>
      `<li>
      <h3>${commit.sha}</h3>
      <p>${commit.commit.message}</p>
      </li>`
  ).join('')
  return `<ul>${result}</ul>`
}

$(document).ready(function (){
});
