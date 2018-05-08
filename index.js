function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

function searchRepositories() {
  const searchTerm = $("#searchTerms")[0].value;
  $.get(`https://api.github.com/search/repositories?q=${searchTerm}`, data => {
    $("#results").html(showRepositories(data))
  }).fail(error => {
    displayError()
  })
}

function showRepositories(data){
  const repositories = '<ul>' + data.items.map(r => {
    return (`
      <li>
        <h2><a href="${r.html_url}">${r.name}</a></h2>
        <p><a href="#" data-repository="${r.name}" data-owner="${r.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
        <p>Watchers: ${r.watchers_count}</p>
        <p>Forks: ${r.forks_count}</p>
        <p>Issues: ${r.open_issues_count}</p>
      </li>
      `)
  }).join('') + '</ul>'
  document.getElementById("results").innerHTML = repositories;
}

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
  })
}

$(document).ready(function (){
});
