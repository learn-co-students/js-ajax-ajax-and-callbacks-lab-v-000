var displayError = () => $('#errors').html("I'm sorry, there's been an error. Please try again.");

var searchRepositories = () => {
  const searchTerms = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
    $('#results').html(renderSearchResults(data))
  }).fail(error => {
    displayError()
  });
};

var renderSearchResults = (results) => {
  const resultList = results.items.map(result => {
    return `
    <div>
      <h3>Name: <a href="${result.html_url}">${result.name}</a></h3>
      <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
      <p>Description: ${result.description}</p>
    </div>`
  });
  return resultList;
};

var showCommits = (el) => {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
    $('#details').html(renderCommits(data))
  }).fail(error => {
    displayError()
  });
};

var renderCommits = (commits) => {
  const commitList = commits.map(commit => {
    return `
    <section>
      <header><h4>Created by: ${commit.author.login}</h4></header>
      <img src="${commit.author.avatar_url}" height="32" width="32">
      <p>SHA: ${commit.sha}</p>
      <p>Message: ${commit.commit.message}</p>
    </section>`
  });
  return commitList;
};

$(document).ready(function (){
});
