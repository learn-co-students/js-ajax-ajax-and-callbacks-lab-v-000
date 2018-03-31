$(document).ready(function (){

  function searchRepositories(searchTerms) {
    let searchTerms = document.getElementById("searchTerms").value
    $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, displayRepositories).fail(displayError)
  }

  function displayRepositories(response) {
    const responseList = response.items.map(r => `<h3><a href="${r.html.url}">${r.name}</a></h3>
    <ul>
      <li>${r.description}</li>
      <li><a href="${r.owner.html_url}">${r.owner.login}</a></li>
      <li><img src="${r.owner.avatar_url}"></li>
      <li><a href="#" onclic="showCommits(this)" data-repository="${r.name}" data-owner="${r.owner.login}">Show Commits</a></li>
    </ul>`);
    $('#results').html(responseList);
  }



});
