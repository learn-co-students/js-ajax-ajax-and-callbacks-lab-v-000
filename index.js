$(document).ready(function (){
});

function searchRepositories () {
    const searchTerm = document.getElementById("searchTerms").value
    $.get(`https://api.github.com/search/repositories?q=${searchTerm}/`, function (data){
      $("#result").html(showRepositories(data));
    }).fail(error => displayError())
  }

  function showRepositories(repos) {

    const repoList = repos.items
    .map(r =>
        `<li>${r.name} - <a href="#" data-repository="${r.name}" data-owner="${r.owner.login}"
         onclick="showCommits(this)">Show Commits</a></li>`
    )
    .join('');
    document.getElementById('results').innerHTML = repoList;
  }

  function showCommits(el) { //object from a href
    const owner = el.dataset.owner;
    const repo = el.dataset.repository;
      $.get(`https://api.github.com/repos/${owner}/${repo}/commits`, function (data){
        $("#details").html(renderCommits(data));
      }).fail(error => displayError())
    }

    function renderCommits(commits) {
      const commitsList = `${commits.map(commit =>
         '<li>' +
         commit.commit.author.name + commit.url +
        '-' +
         commit.commit.message +
         '</li>'
      ).join('')}`;
    document.getElementById('details').innerHTML = commitsList;
  }

function displayError() {
  document.getElementById('errors').innerHTML = 'error';
  }
