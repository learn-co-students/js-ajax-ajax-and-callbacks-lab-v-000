function displayError() {
  $('#errors').html(`I'm sorry, there's been an error. Please try again.`);
}

function searchRepositories() {
  const searchTerms = $('#searchTerms').val();
  const url = `https://api.github.com/search/repositories?q=${searchTerms}`;
  $.get(url, function (data) {
    $('#results').html(renderSearchResults(data))
  }).fail(displayError);
}

function renderSearchResults(data) {
  const repoList = "<ul>" + data.items.map(repo => {
    return (`
      <li>
        <h2><a href="${repo.html_url}">${repo.name}</a></h2>
        <p>${repo.owner.login}</p>
        <img src="${repo.owner.avatar_url}" height="32" width="32">
        <p>${repo.description}</p>
        <p><a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}" onclick="showCommits(this); return false;">Show Commits</a></p>
      </li>
      `)
  }).join('') + "</ul>";
  return repoList;
}

function showCommits(el) {
  const repo = el.dataset.repository
  const owner = el.dataset.owner
  $.get(`https://api.github.com/repos/${owner}/${repo}/commits`, function (response) {
    $('#details').html(renderCommits(response))
  }).fail(displayError);
}

function renderCommits(response) {
  const commits = response;
  const commitList = "<ul>" + commits.map(c => {
    return (`
      <li>
          <h2>Commits by ${c.commit.author.name}</h2>
          <h4>${c.author.login}</h4>
          <img src="${c.author.avatar_url}" height="32" width="32">
          <p>SHA: ${c.sha}</p>
      </li>`)
  }).join('') + "</ul>";
  return commitList;
}
$(document).ready(function (){

});
