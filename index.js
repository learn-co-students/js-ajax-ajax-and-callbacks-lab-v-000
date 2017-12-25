$(document).ready(function (){
});

document.addEventListener("DOMContentLoaded", function(event) {
  Handlebars.registerPartial("authorPartial", document.getElementById("author-partial-template").innerHTML)
});

function searchRepositories() {
  const searchTerms = $('#searchTerms').val();
  const req = new XMLHttpRequest();
  req.addEventListener("load", displaySearchResults);
  req.open("GET", `https://api.github.com/search/repositories?q=${searchTerms}`);
  req.send();
}

function displaySearchResults() {
  const searchResults = JSON.parse(this.responseText).items;
  const searchList = "<ul>" + searchResults.map(repo => {
    return(`
          <li>
            <h2>${repo.name}</h2>
            ${repo.description} <br>
            ${repo.html_url} <br>
            ${repo.owner.login} <br>
            ${repo.owner.avatar_url} <br>
            ${repo.owner.html_url}
          </li>`)
  }).join('') + "</ul>";
  document.getElementById("results").innerHTML = searchList;
}

// resp.items.length // 30
//
// resp.items[0].name; //react-tetris
// resp.items[0].description;// use react, redux, immutable to code...
// resp.items[0].html_url; // 'https://github.com/chvin/react-tetris'
// resp.items[0].owner.login; //'chvin';
// resp.items[0].owner.avatar_url; // 'https://avatars2.githubusercontent.com/u/5383506?v=4'
// resp.items[0].owner.html_url; // 'https://github.com/chvin'

function getRepositories() {
  const username = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`);
  req.send();
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText)
  const repoList = "<ul>" + repos.map(repo => {
    const dataUsername = 'data-username="' + repo.owner.login + '"'
    const dataRepoName = 'data-repository="' + repo.name + '"'
    return(`
          <li>
            <h2>${repo.name}</h2>
            <a href="${repo.html_url}">${repo.html_url}</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
          </li>`
          )
  }).join('') + "</ul>";
  document.getElementById("repositories").innerHTML = repoList
}

function loadSearchTemplate() {
  const searchTerm = document.getElementById("search-form-template").innerHTML;
  document.getElementById("searchBox").innerHTML = searchTerm;
}
