$(document).ready(function (){
});

function searchRepositories() {
  debugger;
  const searchTerms = $('#searchTerms').val;
}

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

// resp.items.length // 30
//
// resp.items[0].name; //react-tetris
// resp.items[0].description;// use react, redux, immutable to code...
// resp.items[0].html_url; // 'https://github.com/chvin/react-tetris'
// resp.items[0].owner.login; //'chvin';
// resp.items[0].owner.avatar_url; // 'https://avatars2.githubusercontent.com/u/5383506?v=4'
// resp.items[0].owner.html_url; // 'https://github.com/chvin'
