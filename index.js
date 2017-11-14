$(document).ready(function (){

});

function searchRepositories() {
  const searchTerms = $("#searchTerms")[0].value;
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, response => {
    $('#results').html(renderSearchResults(response))
  })
}

function renderSearchResults(response) {
  return response.items.map(item => {
    return `
      <div>
        <h2><a target="_blank" href="${item.html_url}">${item.name}</a></h2>
        <p><a href="#" data-repository="${item.name}" data-owner="${item.owner.login}" onclick="showCommits(this); return false;">Show Commits</a></p>
        <p>${item.description}</p>
      </div>
      <hr>
    `
  })
}

function showCommits(link) {
  const repo = link.dataset.repository
  const owner = link.dataset.owner
  $.get(`https://api.github.com/repos/${owner}/${repo}/commits`, response => {
    $('#details').html(renderCommitsResults(response))
  })
}

function renderCommitsResults(response) {
  return response.map(commit => {
    return `
      <div>
        <p>SHA: ${commit.sha}</p>
        <h2>${commit.commit.author.name}</h2>
        <p>${commit.author.login}</p>
        <img src="${commit.author.avatar_url}" alt="${commit.author.login}" height="45" width="45">
      </div>
      <br>
    `
  })
}
