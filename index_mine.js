$(document).ready(function (){



});

function searchRepositories() {
  const searchTerm = $('#searchTerms').val()
  console.log(searchTerm)
  const uri = "https://api.github.com/users/" + searchTerm + "/repos"
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", uri)
  req.send()
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = "<ul>" + repos.map(repo => {
    const dataUsername = 'data-username="' + repo.owner.login + '"'
    const dataRepoName = 'data-repository="' + repo.name + '"'
    return(`
          <li>
            <h2>${repo.name}</h2>
            <h2>${repo.description}</h2>
            <a href="${repo.html_url}">${repo.html_url}</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="showCommits(this)">Show Commits</a><br>
            <h4> Owner: ${repo.owner.login} </h4>
            <h4> Owner Profile Page: <a href="${repo.owner.html_url}">${repo.owner.html_url}</a></h4>
            <img src="${repo.owner.avatar_url}">
          </li>`
          )
  }).join('') + "</ul>";
  document.getElementById("results").innerHTML = repoList
}

function showCommits(el) {
  const repoName = el.dataset.repository
  const uri = "https://api.github.com/repos/" + el.dataset.username + "/" + repoName + "/commits"
  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load", displayCommits)
  xhr.open("GET", uri)
  xhr.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  console.log(commits)
  const commitsList = `<ul>${commits.map(commit => {
    return(`
      <li>
        <h3> ${commit.sha} </h3>
        <h3> ${commit.commit.author.name} </h3>
        <h3> ${commit.author.login} </h3>
        <h3> ${commit.commit.message} </h3>
        <img src="${commit.author.avatar_url}">
      </li>`)
    })
      .join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}



function displayError() {
  $('#errors').html("error")
}
