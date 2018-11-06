$(document).ready(function (){
});

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.");
}

function searchRepositories() {
  let searchTerm = $('#searchTerms').val();
  $.get(`https://api.github.com/search/repositories?q=${searchTerm}`, function(data) {
    console.log(data)   
    $('#results').html(renderResults(data));
  });
}

function renderResults(data) {
  return data.items.map(r => repoTemplate(r));
}

function repoTemplate(result) {
  return `
    <div>
      <a href="${result.html_url}"><strong>${result.name}</strong></a>
      <p>${result.description}</p>
      <a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a>
      <p>
        <img src="${result.owner.avatar_url}" style="width: 50px; height:50px;">
        <a href="${result.owner.html_url}">${result.owner.login}</a>
      </p>
    </div>
  `
}

function showCommits(el) {
  console.log(el);
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, function(data) {
    $('#details').html(renderCommits(data));
  })
}

function renderCommits(data) {
  return data.map(c => commitTemplate(c)).join('')
}

function commitTemplate(c) {
  return `

    <strong>${c.sha}</strong>
    <p>${c.commit_message}</p>

  `
}

