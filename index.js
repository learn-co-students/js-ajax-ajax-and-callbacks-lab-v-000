function displayError() {
  $('#errors').html("error please try again");
}

function renderSearchResult (result){
  return `
      <div>
        <h2><a href="${result.html_url}">${result.name}</a></h2>
        <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
        <p>${result.description}</p>
      </div>
      <hr>
    `
};

let renderSearchResults = (data) => data.items.map( result => renderSearchResult(result));

function searchRepositories() {
  const searchTerms = $('#searchTerms').val();
  let apiUrl = `https://api.github.com/search/repositories?q=${searchTerms}`;
  $.get(apiUrl, data => {
    $('#results').html(renderSearchResults(data))
  }).fail(error => {
    displayError()
  })
}

function renderCommit (commit){
  return `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
}

function renderCommits(data) {
  let result = data.map((commit) => renderCommit(commit)).join("");
  return `<ul>${result}</ul>`
}

function showCommits(el) {
  console.log(el.dataset)
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
    $('#details').html(renderCommits(data));
  }).fail(error => {
    displayError()
  })
}


$(document).ready(function (){

});
