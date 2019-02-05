function displayError() {
  $('#errors').html("Opps! There's an error. Please try again.")
}

function searchRepositories() {
  const reposURL = 'https://api.github.com/search/repositories';
  const searchTerms = $('#searchTerms').val();

  $.get(`${reposURL}?q=${searchTerms}`, response => {
    $('#results').html(renderRepositories(response))
  }).fail(error => {
    displayError()
  })
}

const renderRepositories = (repos) => {
  return repos.items.map(repo => {
    return renderRepository(repo)
  })
}

const renderRepository = (repo) => {
  let description
  if (repo.description === null) {
    description = "No description avalaible"
  }
  else {
    description = repo.description
  }
  return(`
    <div id="${repo.name}">
      <a href="${repo.html_url}"><h2>${repo.name}</h2></a>
      <p>Description: ${description}</p>
      <p>Username:<a href="${repo.owner.html_url}">${repo.owner.login}</a></p>
      <a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}" onclick="showCommits(this)">Show commits</a><br>
      <img src="${repo.owner.avatar_url}" height="32" width="32">
    </div>
    `)
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