$(document).ready(function (){
});

document.addEventListener("DOMContentLoaded", function(event) {
  Handlebars.registerPartial("authorPartial", document.getElementById("author-partial-template").innerHTML)
});

// function searchRepositories() {
//   const searchTerms = $('#searchTerms').val();
//   const req = new XMLHttpRequest();
//   req.addEventListener("load", displaySearchResults);
//   req.open("GET", `https://api.github.com/search/repositories?q=${searchTerms}`);
//   req.send();
// }

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

function displayError() {
  document.getElementById("errors").innerHTML = "I'm sorry, there's been an error.";
}

function displaySearchResults(searchResults) {
  const searchList = "<ul>" + searchResults.map(repo => {
    return(`
          <li>
            <h2>${repo.name}</h2>
            <b>Description: </b>${repo.description} <br>
            <b>Repo Link: </b><a href= ${repo.html_url}>${repo.html_url}</a> <br>
            <b>Owner: </b><a href=${repo.ownerSite}>${repo.ownerLogin}</a><br>
            <img src="${repo.ownerPic}" height="32" width="32"> <br>
          </li>`)
  }).join('') + "</ul>";
  document.getElementById("results").innerHTML = searchList;
}


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

function showCommits(el) {

  //document.getElementById("details").innerHTML = something;
}

// function getRepositories() {
//   const username = document.getElementById("username").value;
//   const req = new XMLHttpRequest();
//   req.addEventListener("load", displayRepositories);
//   req.open("GET", `https://api.github.com/users/${username}/repos`);
//   req.send();
// }
//
// function displayRepositories() {
//   const repos = JSON.parse(this.responseText)
//   const repoList = "<ul>" + repos.map(repo => {
//     const dataUsername = 'data-username="' + repo.owner.login + '"'
//     const dataRepoName = 'data-repository="' + repo.name + '"'
//     return(`
//           <li>
//             <h2>${repo.name}</h2>
//             <a href="${repo.html_url}">${repo.html_url}</a><br>
//             <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
//             <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
//           </li>`
//           )
//   }).join('') + "</ul>";
//   document.getElementById("repositories").innerHTML = repoList
// }

function loadSearchTemplate() {
  const searchTerm = document.getElementById("search-form-template").innerHTML;
  document.getElementById("searchBox").innerHTML = searchTerm;
}
