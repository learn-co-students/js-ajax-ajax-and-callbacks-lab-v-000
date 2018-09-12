function displayCommits(ev) {
  const commits = JSON.parse(this.responseText);
  console.log("display commits",responseText);
  const commitsList = `<ul>${commits
     .map(
       commitInfo =>
         '<li><strong>' +
         commitInfo.author.login + ' - ' +
         commitInfo.commit.author.name +
         '</strong> - ' +
         commitInfo.commit.message +
         '</li>'
     )
     .join('')}</ul>`;
   document.getElementById('details').innerHTML = commitsList;
}

function showCommits(el) {
  const repo = el.dataset.repo;
  const user = el.dataset.user;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  console.log("Show commits for ",`https://api.github.com/repos/${user}/${repo}/commits`);
  req.open('GET', `https://api.github.com/repos/${user}/${repo}/commits`);
  req.send();
}
function handleSearchResults(response) {
  const repos = response.items;
  console.log ("Search Results", repos);
  const repoList = `<ul>${repos
       .map(
         repo =>
           '<li>' +
           '<strong>' +  repo.name + '</strong> -' +
           repo.description + '<br>' +
           '<a href="' + repo.html_url + '">' + repo.html_url + '</a>' + '<br>' +
           '<a href="#" data-repo=' + repo.name + '" data-user="' + repo.owner.login + '">Show Commits</a>' +
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
  $.get(uri, handleSearchResults);
}

$(document).ready(function (){
});
