$(document).ready(function (){

});

function searchRepositories() {
  const searchTerms = document.getElementById("searchTerms").value.split(" ").join("+");
  // GET /search/respositories?q=
  const url = "https://api.github.com/search/repositories?q=" + searchTerms;
  $.get(url, displayResponse).fail(displayError)
}

function displayError(){
  $("#errors").html("I'm sorry, there's been an error. Please try again.")
}

function displayResponse(response) {
  const results = response.items.map( r =>
    '<h3><a href="' + r.html_url + '">' + r.name + '</a></h3><br>'
    +  '<p>' + r.description + '</p>' + '<p><a href="' + r.owner.html_url +  '"> Owner: ' + r.owner.login + '</a></p>'
    + '<img src="' + r.owner.avatar_url + '" height="32" width="32">'
    + '<a href="#" data-repository="' + r.name + '" data-owner="' + r.owner.login
    + '" onclick="showCommits(this)">See Commits</a><br>'
  ).join("");
  $("#results").html(results);
}

function showCommits(data) {
  // GET /repos/:owner/:repo/commits
  //console.log(data.dataset)
  const owner = data.dataset.owner;
  const repo = data.dataset.repository;
  const url = "https://api.github.com/repos/" + owner + "/" + repo + "/commits";
  //console.log(url)
  $.get(url, displayCommits).fail(displayError)
}

function displayCommits(response) {
  //console.log(response)
  const commits = response.map(r =>
    '<p>SHA:' + r.sha + '</p><p>' + r.commit.message
    + '</p>' + '<a href="' + r.author.html_url + '">' + r.author.login + '</a><br>'
    + '<img src="' + r.author.avatar_url + '" width="32"/><br>'
  )
  $("#details").html(commits);
}
