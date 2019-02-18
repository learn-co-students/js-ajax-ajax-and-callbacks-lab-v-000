$(document).ready(function (){
});

function searchRepositories() {
  // const resultsString = `resultsString`
  const searchTerms = document.getElementById("searchTerms").value;
  const searchURL = `https://api.github.com/search/repositories?q=${searchTerms}`;
  $.get(searchURL, function(data) {
    const resultsString = data.items.map(i => `<li>
      Name: ${i.name}<br>
      Description: ${i.description}<br>
      HTML URL: ${i.html_url}<br>
      Owner login:${i.owner.login}<br>
      Owner avatar: ${i.owner.avatar_url}<br>
      Owner's profile: ${i.owner.url}<br>
      <a href="#" data-repository="${i.name}" data-owner="${i.owner.login}" onclick="showCommits(this);">Show Commits</a>
      </li>`).join(``);
    $("#results").append(`<ul>${resultsString}</ul>`);
  }).done(function() {
    $("#results").prepend(`success!`);
  }).fail(function() {
    displayError();
  });
  // const xhr = new XMLHttpRequest();
  // xhr.addEventListener('load', showRepositories);
  // xhr.open('GET', searchURL);
  // xhr.send();
}

// function showRepositories() {
//   const repos = JSON.parse(this.responseText);
//   const repoList = repos;
//   document.getElementById("results").innerHTML = repoList;
// }

function showCommits(r) {
  const owner = r.dataset.owner;
  const repo = r.dataset.repository;
  // const owner = document.getElementById("results").getElementsByTagName("li")[0].innerText.split(": ")[3].split("\n")[1].split(":")[1];
  // const repo = document.getElementById("results").getElementsByTagName("li")[0].innerText.split(": ")[1].split("\n")[0];
  const searchURL = `https://api.github.com/repos/${owner}/${repo}/commits`;
  $.get(searchURL, function(data) {
    const resultsString = data.map(c => `<li>
      SHA: ${c.sha}<br>
      Author: ${c.commit.author.name}<br>
      Message: ${c.commit.message}<br>
      </li>`).join(``);
    $("#details").append(`<ul>${resultsString}</ul>`);
  }).done(function() {
    $("#details").prepend(`success!`);
  }).fail(function() {
    displayError();
  });
}

function displayError() {
  $("#errors").append("I'm sorry, there's been an error. Please try again.");
}
