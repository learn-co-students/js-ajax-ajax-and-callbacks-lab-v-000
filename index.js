$(document).ready(function (){
});

function searchRepositories () {
  const searchTerms = document.getElementById("searchTerms").value;
  const url = "https://api.github.com/search/repositories?q=" + searchTerms;

  $.get(url, function(data) {
    console.log(data.items);
    const repos = data.items;

    const repoList = `<ul>${repos.map(r => '<li><h2><a href="' + r.html_url + '">' + r.name + '</a></h2><p>Description: ' + r.description + '</p><section><h3>Created by ' + r.owner.login + '</h3><img src="' + r.owner.avatar_url + '" height="32" width="32"></section><a href="#" onclick="showCommits(this)" data-repository="' + r.name + '" data-owner="' + r.owner.login + '">Show Commits</a></li>').join('')}</ul>`;
    document.getElementById("results").innerHTML = repoList;
  }).fail(function() {
    displayError();
  });
}

function showCommits (el) {
  const repo = el.dataset.repository;
  const owner = el.dataset.owner;
  const url = "https://api.github.com/repos/" + owner + "/" + repo + "/commits";

  $.get(url, function(data) {
    console.log(data);
    const commits = data;

    const commitList = `<ul>${commits.map(c => '<li><h3>' + c.sha + '</h3><p>' + c.commit.author.name + '</p><p>' + c.author.login + '</p><img src="' + c.author.avatar_url + '" height="32" width="32"></li>').join('')}</ul>`;
    document.getElementById("details").innerHTML = commitList;
  }).fail(function() {
    displayError();
  });
}

function displayError () {
  $("#errors").html("I'm sorry, there's been an error. Please try again.")
}
