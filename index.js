const displayError = () => $('#errors').html("I'm sorry, there's been an error. Please try again.")

const renderCommit = (commit) => {
  return `<li><h3>${commit.sha}</h3><p>Name: ${commit.commit.author.name}</p><p>Login: ${commit.author.login}</p><p>Commit Message: ${commit.commit.message}</p><img src="${commit.author.avatar_url}" alt="avatar"></li>`
}

const renderCommits = (data) => {
  let result = data.map((commit)=>renderCommit(commit)).join('')
  return `<ul>${result}</ul>`
}

const showCommits = (el) => {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
    $('#details').html(renderCommits(data))
  }).fail(error => {
    displayError()
  })
}

const renderSearchResult = (result) => {
  return `
      <div>
        <h2><a href="${result.html_url}">${result.name}</a></h2>
        <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
        <p>${result.description}</p>
      </div>
      <hr>
    `
}

const renderSearchResults = (data) => data.items.map( result => renderSearchResult(result))

function searchRepositories(){
  let search = document.getElementById("searchTerms").value
  $.get(`https://api.github.com/search/repositories?q=${search}`, function(data) {
    $('#results').html(renderSearchResults(data))
  }).fail(error => {
    displayError()
  })
}

$(document).ready(function (){
});
