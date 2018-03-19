$(document).ready(function (){
});

function renderCommit(commit) {
  return `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
}

function renderCommits(response) {
  let result = response.map(function(commit){ return renderCommit(commit)}).join('')
  return `<ul${result}</ul>`
}

function displayError() {
  $("#errors").html("error")
}

function showCommits(el) {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, function(response){
    $("#details").html(renderCommits(response))
  }).fail(function(error){
    displayError()
  })
}

function renderRepo(repo){
  return `
      <div>
        <strong><a href="${repo.html_url}">${repo.name}</a></strong>
        <p><a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
        <p>${repo.description}</p>
      </div>
      <hr>
    `
}

function renderRepos(response){ return response.items.map(repo => renderRepo(repo))}

function searchRepositories() {
  const searchTerms = $("#searchTerms").val();
  console.log(searchTerms);
  let url = `https://api.github.com/search/repositories?q=${searchTerms}`;
  $.get(url, function(response){
    $("#results").html(renderRepos(response))
  }).fail(function(error){
    displayError()
  })
}