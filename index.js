function displayError(error) {
//    document.getElementById("errors").innerHTML = error.statusText;
 document.getElementById("errors").innerHTML = "error";
}

function displayCommits(commits) {
  // ToDo: commitInfo.author.login may not be avail...
  const commitsList = `<ul>${commits
    .map(
      commitInfo =>
        '<li><strong>' +
        commitInfo.author.login + ' - ' +
        commitInfo.commit.author.name +
        '</strong> - ' +
        '<img src ="' + commitInfo.author.avatar_url + '">' +
        commitInfo.sha +
        '</li>'
    )
   .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function showCommits(el) {
  const repo = el.dataset.repository;
  const user = el.dataset.owner;
  $.get(`https://api.github.com/repos/${user}/${repo}/commits`, displayCommits).fail(displayError);
}
function handleSearchResults(response) {
  const repos = response.items;
  const repoList = `<ul>${repos
       .map(
         repo =>
           '<li>' +
           '<strong>' +  repo.name + '</strong> -' +
           repo.description + '<br>' +
           '<a href="' + repo.html_url + '">' + repo.html_url + '</a>' + '<br>' +
           '<a href="#" onclick="showCommits(this)" data-repository="' + repo.name + '" data-owner="' + repo.owner.login + '">Show Commits</a>' +
           '</li>'
       )
       .join('')}</ul>`;
    // const src = document.getElementById('repository-template').innerHTML;
    // const template = Handlebars.compile(src);
    // const repoList = template(repos);
    document.getElementById('results').innerHTML = repoList;
  }

function searchRepositories () {
  let searchTerms = document.getElementsByName("searchTerms")[0].value;
  // ex. https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc
  let uri="https://api.github.com/search/repositories?q="+searchTerms;
  $.get(uri, handleSearchResults).fail(displayError);
}

$(document).ready(function (){
});
