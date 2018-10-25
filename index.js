function searchRepositories() {
  const searchTerm = $('#searchTerms').val();
  $.get(`https://api.github.com/search/repositories?q=${searchTerm}`, response => {
    $('#results').append(`${displayRepoList(response.items)}`)
  }).fail(error => {
    displayError();
  });
}

function displayRepo(repoObject) {
  console.log(`<a href="#" onclick="showCommits(${repoObject})">Show Commits</a><br>`)
  return `
    <h2><a href="${repoObject.html_url}">${repoObject.name}</a></h2>
    <h5>Description: ${repoObject.description}</h5>
    <h5><a href="${repoObject.owner.html_url}">Owner: ${repoObject.owner.login}</a></h5>
    <a href="#" onclick="showCommits(${repoObject})">Show Commits</a><br>
  `;
}

function displayRepoList(response) {
  return response.map(repo => displayRepo(repo));
}

function showCommits(el) {
  console.log(el)
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, response => {
    $('#details').append(displayCommitList(response));
  }).fail(error => {
    displayError();
  });
}

function displayCommitList(response) {
  return response.map(commit => displayCommit(commit));
}

function displayCommit(commit) {
  return `
    <div>
      <img src="${commit.author.avatar_url}" alt="github avatar for ${commit.author.login}">
      <p>Author: ${commit.author.login}</p>
      <p>SHA: ${commit.sha}</p>
    </div>
  `;
}

function displayError() {
  $('#errors').html('<div>Oops, there was an error</div>');
}

$(document).ready(function (){
});
