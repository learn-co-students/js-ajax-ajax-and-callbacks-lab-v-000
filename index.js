function showCommits() {

}

function handleSearchResults(response) {
  const repos = response.items;
  console.log ("Search Results", repos);
  const repoList = `<ul>${repos
       .map(
         repo =>
           '<li>' +
           '<strong>' +  repo.name + '</strong> -' +
           repo.description +
           '<a href="' + repo.html_url + '">' + repo.html_url + '</a>' +
  //         '<a href="#" data-name=' + repo.name + '" data-user="' + repo.user + '">Show Commits</a>' +
           '<a href="#" onclick="showCommits()" data-name=' + repo.name + '">Show Commits</a>' +
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
