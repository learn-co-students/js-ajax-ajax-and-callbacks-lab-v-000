var searchRepositories = () => {
  const searchTerms= $('#searchTerms').val();
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(data) {
    $('#results').html(renderSearchResults(data))
  }).fail(function(error) {
    displayError();
  });
}

var displayError = () => $('#errors').html("I'm sorry, there's been an error.  Please try again.");
var renderSearchResults = data => data.items.map(item => renderResult(item));

var renderResult = result => {
  return `
    <div>
      <h2><a href="${result.html_url}">${result.name}</a></h2>
      <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
      <p>${result.description}</p>
    </div>
  `
}

var showCommits = repoData => {
  $.get(`https://api.github.com/repos/${repoData.dataset.owner}/${repoData.dataset.repository}/commits`, function(data) {
    $('#details').html(renderCommits(data))
  }).fail(function(error) {
    displayError();
  });
}

var renderCommits = commits => {
  return `<ul>${commits.map(item => renderCommit(item)).join('')}</ul>`;
}

var renderCommit = commit => {
  return `
    <div>
      <h2>${commit.commit.author.name} - GitHub: ${commit.author.login}</h2>
      <p>SHA - ${commit.sha}</p>
      <img src="${commit.author.avatar_url}">
    </div>
  `
}

$(document).ready(function (){
});
