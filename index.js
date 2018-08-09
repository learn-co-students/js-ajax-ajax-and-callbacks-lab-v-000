$(document).ready(function() {});

function displayError() {
  $("#errors").html("I'm Sorry, There Was An error.");
}

function searchRepositories() {
  const req = new XMLHttpRequest();
  var searchTerms = document.getElementById("searchTerms").value;
  const results = searchTerms.replace(/^\w/, c => c.toUpperCase());
  req.addEventListener("load", displayRepositories);
  req.open(
    "GET",
    `https://api.github.com/search/repositories?q=${searchTerms}`
  );
  req.send();
}

function displayRepositories(event, data) {
  const repos = JSON.parse(this.responseText);
  debugger;
  const repoList = `<ul>${repos.items
    .map(
      r =>
        "<li>" +
        r.name +
        ' - <a href="#" onclick="showCommits(this)" data-owner="' +
        r.owner["login"] +
        '" data-repository="' +
        r.name +
        '">Get Commits</a> - <a href="#" onclick="getBranches(this)" data-owner="' +
        r.owner["login"] +
        '" data-repository="' +
        r.name +
        '">Get Branches</a></li>'
    )
    .join("")}</ul>`;
  document.getElementById("results").innerHTML = repoList;
}

function showCommits(el) {
  debugger;
  const repoName = el.dataset.repository;
  const owner = el.dataset.owner;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open(
    "GET",
    "https://api.github.com/repos/" + owner + "/" + repoName + "/commits"
  );
  req.send();
}

function displayCommits(el) {
  const commits = JSON.parse(this.responseText);
  debugger;
  const commitsList = commits.map(
    commit => commit.commit.committer.name + " - " + commit.commit.url
  );
  debugger;
  document.getElementById("details").innerHTML = commitsList;
}
// function getBranches(el) {
//   var searchTerms = document.getElementById("searchTerms").value;
//   const name = el.dataset.repository;
//   const req = new XMLHttpRequest();
//   req.addEventListener("load", displayBranches);
//   req.open(
//     "GET",
//     "https://api.github.com/repos/" + username + "/" + name + "/branches"
//   );
//   req.send();
// }
// function displayBranches() {
//   const branches = JSON.parse(this.responseText);
//   const branchesList = `<ul>${branches
//     .map(branch => "<li>" + branch.name + "</li>")
//     .join("")}</ul>`;
//   document.getElementById("details").innerHTML = branchesList;
// }
