function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}


function showCommits(element) {
  const commitsURL = `https://api.github.com/repos/${element.dataset.owner}/${element.dataset.repository}/commits`
  $.get(commitsURL, response => {
    console.log(response);
    $('#details').html(renderCommits(response))
  }).fail(error => {
    displayError()
  })
}


 const renderCommits = (commits) => {
  return commits.map(commit => {
    return renderCommit(commit)
  })
}


const renderCommit = (commit) => {
  return(`
    <div id="${commit.sha}">
      <img src="${commit.author.avatar_url}" height="32" width="32">
      <p>Author: ${commit.commit.author.name}</p>
      <p>Username: ${commit.author.login}</p>
      <p>Sha: ${commit.sha}</p>
    </div>
    `)
}


const renderSearchResult = (result) => {
  return (`
      <div>
        <h2><a href="${result.html_url}">${result.name}</a></h2>
        <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
        <p>${result.description}</p>
      </div>
      <hr>
    `)
}


const renderSearchResults = (data) => data.items.map( result => renderSearchResult(result))


var searchRepositories = () => {
  const searchTerms = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
      $('#results').html(renderSearchResults(data))
    }).fail(error => {
      displayError()
    })
}
