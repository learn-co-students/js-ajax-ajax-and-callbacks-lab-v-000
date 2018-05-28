$(document).ready(function (){
});

function displayError () { 
  return $('#errors').html("I'm sorry, there's been an error. Please try again.")
}


function searchRepositories() {
  const term = document.getElementById('searchTerms').value;
  const url = `https://api.github.com/search/repositories?q=${term}`
  $.get(url, data => {
    // console.log(data);
    $('#results').html(renderResults(data))
  }).fail(error => {
    displayError()
  })
}

function showCommits(result) {
  const owner = result.dataset.owner
  const repo = result.dataset.repository
  const url = `https://api.github.com/repos/${owner}/${repo}/commits`
  $.get(url, data => {
    $('#details').html(renderCommits(data))
  }).fail(error => {
    displayError()
  })
}


function renderResults(data) {
  return data.items.map(result => {
    return `
    <div id="repo-results">
    <img src="${result.owner.avatar_url}" width="45 px"><br>
    <h2><a href="${result.html_url}">${result.name}</a><h2>
    <p><a href="#" data-owner="${result.owner.login}" data-repository="${result.name}" onClick="showCommits(this)">Show Commits</a></p>
    Description: ${result.description}<br>
    URL: <a href="${result.html_url}">${result.html_url}</a><br>
    Owner: ${result.owner.login}<br>
    Owner Profile Page: <a href="${result.owner.url}">${result.owner.url}</a><br><br>
    </div>
    ` 
  })
}

function renderCommits(data) {
  return data.map(result => {
    return `
    <p>SHA: ${result.sha}</p>
     <img src="${result.author.avatar_url}" width="45px"<br>
     <h2><a href="${result.author.html_url}">${result.author.login}</a></h2><br>
    `
  })
}