function searchRepositories(){
  const searchTerms = $('#searchTerms').val();
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(data) {
    $('#results').html(displayResults(data));
  }).fail(error => {
    displayError()
  });
}

function displayResults(data) {
  return data.items.map(r => displayResult(r));
}

function displayResult(r) {
  return `
    <div>
      <h3><a href="${r.html_url}">${r.name}</a></h3>
      <p>${r.description === null ? 'not available' : r.description}</p>
      <p><a href="#" data-repository="${r.name}" data-owner="${r.owner.login}" onclick="showCommits(this);return false;">Show Commits</a></p>
      <h4>Repo Owner: <a href="${r.owner.html_url}">${r.owner.login}</a> <img src="${r.owner.avatar_url}" height="32" width="32"></h4>
    </div>
    <hr>
    `
}

function showCommits(el){
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, function(data){
    $('#details').html(renderCommits(data));
  }).fail(error => {
    displayError();
  });
}

function renderCommit(c) {
  return `
    <div>
        <h3>SHA: ${c.sha}</h3>
        <p>Author: ${c.commit.author.name} | Login: ${c.author === null ? 'not available' : c.author.login} <img src="${c.author.avatar_url}" height="32" width="32"></p>
    </div>
    <hr>
    `
}

function renderCommits(data) {
  return data.map(c => renderCommit(c));
}

function displayError() {
  return $('#errors').html("I'm sorry, there's been an error. Please try again.");
}

$(document).ready(function (){
});
