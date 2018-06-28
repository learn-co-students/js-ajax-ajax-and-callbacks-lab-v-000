//$(document).ready(function (){

  function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.");
}

  function displaySearchResult(response)  {
    const repoList = "<ul>" + response.items.map(repo => {
    return (`
      <li>
      <h3> <a href="#" ${repo.html_url}><strong>${repo.name}</strong></a> - ${repo.description}</h3>
      <a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}" onclick="showCommits(this)">Show Commits</a>
      <p>Owner: <a href="#" ${repo.owner.login}>${repo.owner.login}</a></p>
      <img src="${repo.owner.avatar_url}">
      </li>
      <hr>
    `)
  }).join('') + "</ul>";
    return repoList;
  }

  function searchRepositories() {
    //debugger
    const searchTerms = document.getElementById("searchTerms").value;
    const searchURL = `https://api.github.com/search/repositories?q=${searchTerms}`

    $.get(searchURL, function (response) {
      $('#results').html(displaySearchResult(response))
  }).fail(displayError);
}



function renderCommits(response) {
  const commitsList = "<ul>" + response.map(c => {
  return (`
    <li>
    <h2>Commits by ${c.commit.author.name}</h2>
           <h4>${c.author.login}</h4>
           <img src="${c.author.avatar_url}" height="32" width="32">
           <p>SHA: ${c.sha}</p>
    </li>
    <hr>
  `)
}).join('') + "</ul>";
  return commitsList;
}

function showCommits(element) {
  const repoName = element.dataset.repository
  const userName = element.dataset.owner

  $.get(`https://api.github.com/repos/${userName}/${repoName}/commits`, function(response) {
    $('#details').html(renderCommits(response))
  }).fail(displayError);
}



//});
