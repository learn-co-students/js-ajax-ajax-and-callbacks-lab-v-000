$(document).ready(function (){
});

function displayError(error) {
  document.getElementById('errors').innerHTML = "An error has occurred: " + error
}

function searchRepositories() {
  const searchTerms = document.getElementById('searchTerms').value
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(data) {
    displayRepositories(data)
  }).fail(function(error) {
    displayError(error)
  })
}

function displayRepositories(data) {
  const dataList = `${data.items[0].name}: <a href="#" data-repository="${data.repository}"
  data-owner="${data.owner}" onclick="showCommits()">Show Commits</a>`
  document.getElementById('results').innerHTML = dataList
}

function showCommits(data) {
  $.get(`https://api.github.com/repos/${data.dataset.owner}/${data.dataset.repository}/commits`, function(commits) {
    const commitList = `<ul>${commits.map(c => {
      return (
        `<li>
          <h4>Author: ${c.committer.name} - ${c.commit.message}</h4>
          <p>SHA: ${c.sha}</p>
          <p>URL: ${c.html_url}">${c.html_url}</p>
        </li>`
      )
    })}</ul>`

    $("#details").html(commitList)

  })
}
