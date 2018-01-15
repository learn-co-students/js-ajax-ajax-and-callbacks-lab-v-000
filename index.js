$(document).ready(function (){
});

function searchRepositories() {
  const req = new XMLHttpRequest();
  const searchTerm = document.getElementById("searchTerms").value;
  req.addEventListener("load", showRepositories);
  req.open("GET", 'https://api.github.com/search/repositories?q=' + searchTerm);
  req.send();
}

function showRepositories(event, data) {
  const repos = JSON.parse(this.responseText);
  const markup = `
      <ul class="repos">
        ${repos.items.map(repo => `<li>${repo.name}</li>` +
                                  `<p>${repo.owner.login}</p>` +
                                  '<a href="#" data-repository="' + repo.name + '" data-owner="' + repo.owner.login + '" onclick="showCommits(this)">Show Commits</a>').join("")}
      </ul>
      `;

  document.getElementById("results").innerHTML = markup;
}

function displayError() {
  document.getElementById("errors").innerHTML = "I'm sorry, there's been an error. Please try again.";
}

function showCommits(el) {
  const username = el.dataset.owner;
  const name = el.dataset.repository;
  debugger;
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + name + '/commits')
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);

  const commitsList = `
      <ul class="commits">
        ${commits.map(commit => `<li>${commit.sha}</li>`)}
      </ul>
      `;


  document.getElementById("details").innerHTML = commitsList;
}




document.addEventListener("DOMContentLoaded", function(event) {
  Handlebars.registerPartial("authorPartial", document.getElementById("author-partial-template").innerHTML)
})
