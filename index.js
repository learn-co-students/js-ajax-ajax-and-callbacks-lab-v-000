$(document).ready(function (){
});

function searchRepositories () {
    const searchTerm = document.getElementById("searchTerms").value
    $.get(`https://api.github.com/search/repositories?q=${searchTerm}/`, function (data){
      $("#result").html(showRepositories(data));
    }).fail(error => displayError())
  }

  function showRepositories(repos) {
    console.log(repos);
    const repoList = `<ul>${repos.items
    .map(
      r =>
        '<li>' +
        r.name +
        ' - <a href="#" data-repo="' +
        r.name +
        '" onclick="getCommits(this)">Get Commits</a></li>'
    )
    .join('')}</ul>`;
    document.getElementById('results').innerHTML = repoList;
  }

  function getCommits(el) {
    const owner = this.name;
    const repo = el.dataset.repo;
      $.get(`https://api.github.com/repos/${owner}/${repo}/commits/)`, function (data){
        $("#details").html(showCommits(data));
      }).fail(error => displayError())
    }

    function showCommits(commits) {
      debugger
      const commitsList = `<ul>${commits.map(commit =>
         '<li><strong>' +
         commit.commit.author.name + commit.url +
        '</strong> - ' +
         commit.commit.message +
         '</li>'
      ).join('')}</ul>`;
    document.getElementById('details').innerHTML = commitsList;
  }

function displayError() {
  document.getElementById('errors').innerHTML = 'error';
  }
