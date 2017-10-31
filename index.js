  function searchRepositories () {
    const searchTerms = $("#searchTerms").val().replace(" ", "+")
    $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function (data) {
      let results = data.items.map (item => {
        return `
        <div>
          <h2><a href="${item.html_url}">${item.name}</a></h2>
          <p>${item.description}</p>
          <p><a href"#" data-repository="${item.name}" data-owner="${item.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
        </div>
        `
      })
      $("#results").html(results)
    }).fail(error => {
      displayError()
    })
  }

  function showRepositories (event, data) {
    const repositories = JSON.parse(this.responseText)
    const source = document.getElementById('repository-template').innerHTML

    const repositoriesTemplate = Handlebars.compile(source)
    const repositoryList = repositoriesTemplate(repositories)

    document.getElementById('results').innerHTML = repositoryList
  }

function showCommits (element) {
  const owner = element.dataset.owner
  const repo = element.dataset.repository

  $.get(`https://api.github.com/repos/${owner}/${repo}/commits`,function (commits) {
    let details = commits.map(commit => {
      return `
      <p>${commit.sha}</p>
      <p>${commit.author.name}</p>
      <p>${commit.author.login}</p>
      <img src="${commit.author.avatar_url}">`
    })
    $("#details").html(details)
  })
}

function displayError () {
  $("#errors").html("I'm sorry, there's been an error. Please try again.")
}

$(document).ready(function (){
});
