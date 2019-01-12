const searchURL = "https://api.github.com/search/repositories?q="
const repoURL = "https://api.github.com/repos"

function searchRepositories() {
  const searchTerm = document.getElementById('searchTerms').value
  $.get(searchURL + searchTerm, function(response) {
    const repos = response.items
    displayRepos(repos)
  }).fail(function (error) {
    displayError(error)
    console.log("Hmm seems like there was an error:" + `${error}`)
  })
}

function displayRepos(repos) {
  const repoList =
  '<ul>' +
  repos
    .map(r => {
      return `
        <li>
          <h2><a href="${r.html_url}">${r.name}</a></h2>
          <section>
             <header><h4>Created By ${r.owner.login}</h4></header>
             <img src="${r.owner.avatar_url}" height="32" width="32">
          </section>
        </li>`;
    })
    .join('') +
  '</ul>';

  $("div#results").html(repoList)
}

function showCommits(el) {
  console.log();
  $.get(`${repoURL}/${el.dataset.owner}/${el.dataset.repository}/commits`, function (response) {
    document.getElementById("details").innerHTML = displayCommits(response)
  }).fail(function (error) {
    displayError(error)
    console.log("Hmm seems like there was an error:" + `${error}`)
  })
}

function displayCommits(response) {
  return response
      .map(r => {
        return `
        <div>
          SHA: ${r.sha}<br>
          Author: ${r.commit.author.name}<br>
          Author Login: ${r.author.login}<br>
          <img width="50px" height="50px" src="${r.author.avatar_url}"><br>
        </div>`
      }
    )
}



function displayError() {
  $("div#errors").html("error")
}
