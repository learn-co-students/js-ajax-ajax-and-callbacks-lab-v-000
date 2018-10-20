var displayError =() => {
  $('#errors').html("I'm sorry, there's been an error. Please try again.");
}

var renderCommit = (commit) => {
  return `
    <li>
      <p><font color="blue">${commit.sha}</font></p>
      <b><i>>> ${commit.commit.message}</i></b>
    </li>`
}

var renderCommits = (data) => {
  let result = data.map(
    (commit) => renderCommit(commit)
  ).join('')
  return `<ul>${result}</ul>`
}

var showCommits = (el) => {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, function(data) {
    $('#details').html(renderCommits(data))
  }).fail((error) => {
    displayError();
  });
}
var renderSearchResult = (result) => {
  return `
    <div>
      <h2><a href="${result.html_url}">${result.name}</a></h2>
      <p>${result.description}</p>
      <p>Author: <a href="${result.owner.html_url}">${result.owner.login}</a></p>
      <p><img src="${result.owner.avatar_url} height="45" width="45"></p>
      <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
    </div>`
}

var renderSearchResults = (data) => data.items.map(item => renderSearchResult(item));

var searchRepositories = () => {
  const searchTerms = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(data) {
    $('#results').html(renderSearchResults(data));
  }).fail(function(error) {
      displayError();
  });
}

$(document).ready(function (){
});
