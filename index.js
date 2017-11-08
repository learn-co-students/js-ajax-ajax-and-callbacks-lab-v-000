$(document).ready(function (){
});

function searchRepositories() {
  const terms = document.getElementById('searchTerms').value
  const url = `https://api.github.com/search/repositories?q=${terms}`
  $.get(url, function(response) {
    $('#results').html(searchResults(response))
  });
}

function searchResults(results) {
  //console.log(results)
  return results.items.map(result =>
     `<div>
       <h2><a href="${result.html_url}">${result.name}</a></h2>
       <p>Owner: <a href="${result.owner.html_url}">${result.owner.login}</a> <img src="${result.owner.avatar_url}" width="32" height="32" /></p>
       <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
       <p>${result.description}</p>
     </div>
     <hr>`
  );
}

function showCommits(item) {
  const url = `https://api.github.com/repos/${item.dataset.owner}/${item.dataset.repository}/commits`
  $.get(url, function(response) {
    $('#details').html(displayCommits(response))
  }).fail(displayError());
}

function displayCommits(commits){
  console.log(commits)
  return commits.map(commit =>
    `<ul>
       <li>${commit.sha}</li>
     </ul>`
  );
}

function displayError() {
  $('#errors').html(`There's been an error, please try again.`)
}
