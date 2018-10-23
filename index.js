$(document).ready(function (){
});

function searchRepositories() {
  // grabs value in the search input
  let search = $('#searchTerms').val();

  // uses github repo search endpoint with search value
  $.get(`https://api.github.com/search/repositories?q=${search}`, function(data) {
    // sents endpoint success response data to displayRepo func
    $('#results').html(displayRepo(data));
    // sends endpoint failure response to displayError func
  }).fail(error => displayError());
}

function displayRepo(data) {
  let results = data.items;
  let searchList = `<ul>${results.map(repo => {
    return `<li><a href="${repo.html_url}">${repo.name}</a>
    - ${repo.description} - <a data-repository="${repo.name}" data-owner="${repo.owner.login}" href="#" onclick="showCommits(this)">Show Commits</a></li>`
  }).join('')}
  </ul>`

  return searchList;
}

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

function showCommits(repo) {
  let repoOwner = repo.dataset.owner;
  let repoName = repo.dataset.repository;
  $.get(`https://api.github.com/repos/${repoOwner}/${repoName}/commits`, function(data) {
    $('#details').html(displayCommits(data));
  }).fail(error => displayError());
}

function displayCommits(data) {
  let commits = `<ul>${data.map(commit => {
    return `<li>${commit.sha} - ${commit.author.login} - ${commit.commit.message}</li>`
  }).join('')}
  </ul>`
  return commits
}
