$(document).ready(function (){

});

function displayError(error) {
  $("#errors").html("I'm sorry, there's been an error. Please try again.")
}

function showCommits(el) {
  const owner = el.dataset.owner
  const repo = el.dataset.repository 

  $.get("https://api.github.com/repos/" + owner + "/" + repo + "/commits", (response) => {
    let html = ''

    for (const commit of response) {
      const sha = commit.sha
      const author = commit.author.login
      const avatar = commit.author.avatar_url

      html +=
        `
          SHA: ${sha} <br>
          Author: ${author} <br>
          <img src="${avatar}" height="32" width="32"> <br>
        `
    }

    $('#details').html(html)
  })
}

function searchRepositories() {
  const queryString = $('#searchTerms').val()
  const terms = queryString.split(" ").join("+")

  $.get("https://api.github.com/search/repositories?q=" + terms, (response) => {
    let html = "<ul>"

    for (const repo of response.items) {
      const name = repo.name
      const desc = repo.description
      const link = repo.html_url
      const owner = repo.owner.login
      const avatar = repo.owner.avatar_url
      const homepage = repo.owner.url

      html +=
        `
          <li>
            Name: <a href="${link}">${name}</a> <br>
            Owner: <a href="${homepage}">${owner}</a> <br>
            <img src="${avatar}" height="32" width="32"> <br>
            Description:
            <p>${desc}</p>
            <a href="#" 
              data-owner="${owner}" data-repository="${name}" 
              onclick="showCommits(this)"
            >
              Show Commits
            </a> <br>
            <br>
          </li>
        `
    }

    html += "</ul>"

    $('#results').html(html)

  }).fail((error) => {
    displayError(error)
  })
}
