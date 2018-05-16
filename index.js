$(document).ready(function (){
});

function searchRepositories() {
  const input = $("#searchTerms")[0].value;
  const url = "https://api.github.com/search/repositories?q=" + input;

  $.get(url, function(data) {
    console.log(data.items);

    const repos = data.items;
    const repoList = "<ul>" + repos.map(r => {
      return (`
        <li>
        <h2><a href="${r.html_url}">${r.name}</a></h2>
        <p>Description: ${r.description}</p>
        <p>Created by: ${r.owner.login}</p>
        <a href="#" onclick="showCommits(this)" data-repository="${r.name}" data-owner="${r.owner.login}">Show Commits</a>
        <p><img src="${r.owner.avatar_url}" height="45" width="45"></p>
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
    const commitList = "<ul>" + commits.map(c => {
      return (`
        <li>
        <p>SHA: ${c.sha}</p>
        <p>Author: ${c.commit.author.name}</p>
        <p>Author login: ${c.author.login}</p>
        <p><img src="${c.author.avatar_url}" height="45" width="45"></p>
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
