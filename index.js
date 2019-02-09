var displayError = () => {
  $('#errors').html("error")
}

var searchRepositories = () => {
  searchTerms = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(data) {
      // This will not be called because the .html file request doesn't exist
      $('#results').html(displayResponse(data));
  }).fail(function(error) {
      // This is called when an error occurs
      displayError();
  });
}
var renderSearchResult = (r) => {
  return `
  <div>
  <a href="${r.html_url}">${r.name}</a><br>
  <a href="#" data-owner="${r.owner.login}" data-repo="${r.name}" onclick="showCommits(this)"> Show Commits </a>
  </div>`

}
//GET /repos/:owner/:repo/commits
var showCommits = (atag) => {
  debugger
  $.get(`https://api.github.com/repos/${atag.dataset.owner}/${atag.dataset.repo}/commits`, function(data) {

      // This will not be called because the .html file request doesn't exist
      $('#details').html(displayCommits(data));
  }).fail(function(error) {
      // This is called when an error occurs
      displayError();
  });
}

var renderCommitInfo = (c) => {
  return `
  <div>
  <img src="${c.author.avatar_url}">
  <p>${c.sha}, ${c.author.login}</p>
  <p>${c.commit.message}</p>
  </div>`
}

var displayCommits = (data) => {
  const commitList = data.map(
    c => renderCommitInfo(c)
  )

  return commitList
}

var displayResponse = (data) => {
  const repoList = data.items.map(
    r => renderSearchResult(r)
  )

  return repoList
}

$(document).ready(function (){
});
