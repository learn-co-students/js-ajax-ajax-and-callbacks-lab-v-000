function displayError() {
  document.getElementById('errors').innerHTML = "I'm sorry, there's been an error. Please try again."
}

function prepareCommitListItem(c) {
  return `
    <li>
      <p>
        ${c.sha} - ${c.commit.author.name} - ${c.author.login}
        <img src="${c.author.avatar_url}" alt="avatar" /> 
      </p>
    </li>
  `
}

function displayCommits(commits) {
  // const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(c => prepareCommitListItem(c)).join("")}</ul>`
  document.getElementById('details').innerHTML = commitsList;
}

function showCommits(el) {
  const repo = el.dataset.repository;
  const owner = el.dataset.owner;

  // const req = new XMLHttpRequest();
  // req.addEventListener('load', displayCommits);
  // req.open("GET", `https://api.github.com/repos/${owner}/${repo}/commits`);
  // req.send();

  $.get(`https://api.github.com/repos/${owner}/${repo}/commits`)
    .done(function(data) {
      displayCommits(data);
    })
    .fail(function() {
      displayError();
    });
}

function prepareListItem(r) {
  return `
    <li>
      <p>
        <a href=${r.html_url}>${r.name}</a> - <a href="#" data-repository=${r.name} data-owner=${r.owner.login} onclick="showCommits(this)">Show Commits</a>
      </p>
      <p>${r.description}</p>

      <p>
        <a href=${r.owner.url}>
          <img src=${r.owner.avatar_url} alt="avatar">
          ${r.owner.login}
        </a>
      </p>
    </li>`
}

function displayRepositories(repos) {
  // const repos = JSON.parse(this.responseText).items;
  const repoList = `<ul>${repos.map(repo => prepareListItem(repo)).join('')}</ul>`;
  document.getElementById('results').innerHTML = repoList;
}

function searchRepositories() {
  const searchTerm = document.getElementById('searchTerms').value;
  // const req = new XMLHttpRequest();
  // req.addEventListener("load", displayRepositories)
  // req.open("GET", `https://api.github.com/search/repositories?q=${searchTerm}`);
  // req.send()

  $.get(`https://api.github.com/search/repositories?q=${searchTerm}`)
    .done(function(data) {
      displayRepositories(data.items);
    })
    .fail(function() {
      displayError();
    });
}

$(document).ready(function (){
  $('.search').click(function(e) {
    e.preventDefault();
    searchRepositories();
  });
});
