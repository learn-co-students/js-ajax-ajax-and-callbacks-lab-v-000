$(document).ready(function () {
})

function searchRepositories() {
  const input = $("#searchTerms")[0].value;
  const url = "https://api.github.com/search/repositories?q=" + input;

  $.get(url, function(data) {
    console.log(data.items);

    const repos = data.items;
    const repoList = "<ul>" + repos.map(repo => {
      return (`
        <li>
        <h2><a href="${repo.html_url}">${repo.name}</a></h2>
        <p>Description: ${repo.description}</p>
        <a href="#" onclick="showCommits(this)" data-repository="${repo.name}" data-owner="${repo.owner.login}">Show Commits</a>
        <p><img src="${repo.owner.avatar_url}" height="45" width="45"></p>
        </li>
        `)
    }).join('') + "</ul>"
    document.getElementById("results").innerHTML = repoList
  }).fail(function() {
    displayError();
  });
}

function showCommits(el) {
  const owner = el.dataset.owner
  const repo = el.dataset.repository
  const url = "https://api.github.com/repos/" + owner + "/" + repo + "/commits";

  $.get(url, function(data) {
    console.log(data);

    const commits = data;
    const commitList = "<ul>" + commits.map(commit => {
      return (`
        <li>
        <p>SHA: ${commit.sha}</p>
        <p>Author: ${commit.author.name}</p>
        <p>Author login: ${commit.author.login}</p>
        <p><img src="${commit.author.avatar_url}" height="45" width="45"></p>
        </li>
        `)
    }).join('') + "</ul>"
    document.getElementById("details").innerHTML = commitList
  }).fail(function() {
    displayError();
  });
}

function displayError() {
  $("#errors").html("I'm sorry, there's been an error. Please try again.")
}
