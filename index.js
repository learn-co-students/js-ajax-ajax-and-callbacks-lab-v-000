const url = `https://api.github.com`

function searchRepositories() {
  const searchTerms = $('#searchTerms').val()
  console.log(searchTerms)
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, (response) => {
    const results = renderSearchResults(response)
    $('#results').html(results)
  }).fail(displayError)
}

function renderSearchResults(data) {
  return data.items.map(item => {
    return (
      `<div>
        <h1>Name: ${item.name}</h1>
        <p>Description: ${item.description}</p>
        <p>Link: ${item.html_url}</p>
        <br></br>
        <h2>Repository Owner:</h2>
        <img href="${item.owner.avatar_url}"/>
        <h3><a href="${item.owner.url}">${item.owner.login}</a></h3>
        <br></br>
        <a href="#" data-repository="${item.name}" data-owner="${item.owner.login}" onclick="showCommits(this)">Show Commits</a>
      </div><br>`
    )
  })
}

function showCommits(el) {
  const repo = el.dataset.repository
  const username = el.dataset.owner
  $.get(`https://api.github.com/repos/${username}/${repo}/commits`, (response) => {
    const details = renderCommits(response)
    $('#details').html(details)
  }).fail(displayError)
}

function renderCommits(data) {
  return data.map(c => {
    return (
      `<div>
        <h2>Author:</h2>
        <img href="${c.author.avatar_url}"/>
        <p>Name: ${c.commit.author.name}</p>
        <p>Login: ${c.author.login}</p>
        <p>SHA: ${c.sha}</p>
      </div>`
    )
  })
}

function displayError() {
  $('#errors').html('I\'m sorry, there\'s been an error. Please try again.')
}

$(document).ready.done(function (){

});
