$(document).ready(function (){
});

function searchRepositories() {
  let input = $('#searchTerms').val();
  $.get(`https://api.github.com/search/repositories?q=${input}`, function(response) {
    $('#results').html(showRespositories(response))
  }).fail(function(errors) {
    displayError()
  })
}

function showRespositories(response) {
  const repoList = '<ul>' + response.items.map(r => {
    return (`
     <li>
       <h2><a href="${r.html_url}">${r.name}</a></h2>
       <p>${r.description}</p>
       <p><a href="#" data-repository="${r.name}" data-owner="${r.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
     </li>`
     )
    }).join('') + "</ul>"
  document.getElementById("results").innerHTML = repoList
}

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

function showCommits(el) {
  const owner = el.dataset.owner
  const repo = el.dataset.repository
  $.get(`https://api.github.com/repos/${owner}/${repo}/commits`, function(response) {
    console.log(response)
    $('#details').html(renderCommits(response))
  })
}

function renderCommits(response) {
  let result = response.map((commit)=>renderCommit(commit)).join('')
  return `<ul>${result}</ul>`
}

function renderCommit(commit) {
  return `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
}
