$(document).ready(function (){
});

function searchRepositories() {
  const searchTerms = $('#searchTerms').val();
  const apiRequest = `https://api.github.com/search/repositories?q=${searchTerms}`;

  $.get(apiRequest, function(resp) {
    const searchResults = [];
    for (const repo of resp.items) {
      let repoHash = {};
      repoHash.name = repo.name;
      repoHash.description = repo.description;
      repoHash.html_url = repo.html_url;
      repoHash.ownerSite = repo.owner.html_url;
      repoHash.ownerLogin = repo.owner.login;
      repoHash.ownerPic = repo.owner.avatar_url;
      searchResults.push(repoHash);
    }
    displaySearchResults(searchResults);
  }).fail(function(error){
    displayError();
  });
}

function displaySearchResults(searchResults) {
  const searchList = "<ul>" + searchResults.map(repo => {
    const dataUsername = `data-owner=${repo.ownerLogin}`;
    const dataRepoName = `data-repository=${repo.name}`;
    return(`
          <li>
            <h2>${repo.name}</h2>
            <b>Description: </b>${repo.description} <br>
            <b>Repo Link: </b><a href= ${repo.html_url}>${repo.html_url}</a> <br>
            <b>Owner: </b><a href=${repo.ownerSite}>${repo.ownerLogin}</a><br>
            <img src="${repo.ownerPic}" height="64" width="64"> <br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="showCommits(this)">Show Commits</a><br>
          </li>`)
  }).join('') + "</ul>";
  $('#results').html(searchList);
}

function showCommits(el) {
  const owner = el.dataset.owner;
  const repo = el.dataset.repository;
  const apiRequest = `https://api.github.com/repos/${owner}/${repo}/commits`;
  $.get(apiRequest, function(resp) {
    const commits = [];
    for (const commit of resp) {
      let commitHash = {};
      commitHash.sha = commit.sha;
      commitHash.description = commit.commit.message;
      commitHash.authorName = commit.commit.author.name;
      if (commit.author) {
        commitHash.authorLogin = commit.author.login; //null??
        commitHash.authorPic = commit.author.avatar_url;
      }
      commits.push(commitHash);
    }
    displayCommits(commits);
  }).fail(function(error){
    displayError();
  });
}

function displayCommits(commits) {
  const commitList = "<ul>" + commits.map(commit => {
    return(`
          <li>
            <b>sha: </b> ${commit.sha} <br>
            <b>description: </b> ${commit.description} <br>
            <b>commit by: </b> ${commit.authorName} <br>
            <b>aka: </b> ${commit.authorLogin} </br>
            <img src="${commit.authorPic}" height="64" width="64">
          </li>
          `)
  }).join('') + "</ul>";
  $('#details').html(commitList);
}

function displayError() {
  $('#errors').html("I'm sorry, there's been an error.");
}

function loadSearchTemplate() {
  const searchTerm = document.getElementById("search-form-template").innerHTML;
  document.getElementById("searchBox").innerHTML = searchTerm;
}

// ALTERNATE METHOD VIA XMLHttpRequest and JSON parsing.
// function searchRepositories() {
//   const searchTerms = $('#searchTerms').val();
//   const req = new XMLHttpRequest();
//   req.addEventListener("load", displaySearchResults);
//   req.open("GET", `https://api.github.com/search/repositories?q=${searchTerms}`);
//   req.send();
// }

// function displaySearchResults() {
//   const searchResults = JSON.parse(this.responseText).items;
//   const searchList = "<ul>" + searchResults.map(repo => {
//     return(`
//           <li>
//             <h2>${repo.name}</h2>
//             <b>Description: </b>${repo.description} <br>
//             <b>Repo Link: </b><a href= ${repo.html_url}>${repo.html_url}</a> <br>
//             <b>Owner: </b><a href=${repo.owner.html_url}>${repo.owner.login}</a><br>
//             <img src="${repo.owner.avatar_url}" height="32" width="32"> <br>
//           </li>`)
//   }).join('') + "</ul>";
//   document.getElementById("results").innerHTML = searchList;
// }
