
var displayError = () => $('#errors').html("I'm sorry, there's been an error. Please try again.")

var renderCommit = (commit) => {
  return `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
}

var renderCommits = (data) => {
  let result = data.map((commit)=>renderCommit(commit)).join('')
  return `<ul>${result}</ul>`
}

var showCommits = (el) => {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
    $('#details').html(renderCommits(data))
  }).fail(error => {
    displayError()

function searchRepositories(){
  const searchTerms = document.getElementById('searchTerms').value

  $.get( `https://api.github.com/search/repositories?q=${searchTerms}`, data => {
    $('#results').html(renderSearchResults(data))
  }).fail(error => {
    displayError()
  })
};

const renderSearchResults = (data) => data.items.map( result => renderResult(result))

function renderResult(result) {
  return `
      <div>
        <h2><a href="${result.html_url}">${result.name}</a></h2>
        <p>${result.description}</p>
        <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
        <p>${result.owner.login}</p>
        <p><img src="${result.owner.avatar_url}" style="width:100px;height:100px;"></p>
      </div>
      <hr>
    `
};

$(document).ready(function (){

});
