$(document).ready(function (){
});

function searchRepositories () {
  function returnRepositories () {
    const req = new XMLHttpRequest();
    const searchTerms =  document.getElementById("searchTerms").value
    req.addEventListener('load', showRepositories);
    req.open('GET',`https:\/\/api.github.com\/search\/repositories\?q=${searchTerms}/`)
    req.send();
  };
    function showRepositories() {
      var repos = JSON.parse(this.responseText);
      console.log(repos);
const repoList = `<ul>${repos
  .map(r => '<li>' + r.name + '</li>')
  .join('')}</ul>`;
document.getElementById('repositories').innerHTML = repoList;
    }
  debugger
//  document.getElementById('results').innerHTML =

}
