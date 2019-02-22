

// Create a "Search Repositories" link that calls a searchRepositories function on click, takes the value of a searchTerms text input, and queries the GitHub repository search API.

function searchRepositories(){
  const searchTerms = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${searchTerms})`, function(data) {
    $('#results').html(showRepositories(data));
  }).fail(error => {
      displayError()
  })
}

function showRepositories(data) {
  // const repos = JSON.parse(this.responseText);
  const repoList =
      '<ul>' +
      data.items
        .map(r => {
          return `
            <li>
              <h2><a href="${r.html_url}">${r.name}</a></h2>
              <p>Name: ${r.name}</p>
              <p>Description: ${r.description}</p>
              <p><a href="#" data-repository="${r.name}" data-owner="${r.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
            </li>`;
        })
        .join('') +
      '</ul>';
  document.getElementById('results').innerHTML = repoList;
}

function showCommits(el){
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
    $('#details').html(renderCommits(data))
  }).fail(error => {
    displayError()
  })
}

function renderCommits(data){
  const commits = data
    .map(
      commit =>
        '<ul>' +
        commit.sha + '-' +
        commit.commit.message +
        '</ul>'
    );
  document.getElementById('details').innerHTML = commits;
}

function displayError(){
  $('#errors').html("There's been an error. Try again.");
}

$(document).ready(function (){
});
