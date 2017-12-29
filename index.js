const template = function(repo) {
  return `
      <div>
        <h3><a href="${repo.html_url}">${repo.name}</a></h3>
        <h3>Created By <a href="${repo.owner.html_url}">${repo.owner.login}</a>
        <img src="${repo.owner.avatar_url}" height="32" width="32"></h3>
        <p><a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}" onclick="showCommits(this); return false;">Show Commits</a></p>
      </div>
  `
}

const templateHTML = function(data) {
  return data.items.map(item => template(item)).join('')
}

function searchRepositories() {
  const searchTerms = $("#searchTerms").val()
  $.get("https://api.github.com/search/repositories?q=" + searchTerms)
    .done(function(data) {
      $("#results").html(templateHTML(data))
    })
    .fail(displayError())
}

function displayError() {
  $("#errors").html("There was an error. Please try again.")
}

const commitTemplate = function(commit) {
  return `
      <div>
        <h3>${commit.sha}</h3>
        <h3>By ${commit.author.login} <img src="${commit.author.avatar_url}" height="32" width="32"></h3>
      </div>
  `
}

const commitHTML = function(commits) {
  return commits.map(commit => commitTemplate(commit)).join('')
}

function showCommits(el) {
  const repo = el.dataset.repository
  const owner = el.dataset.owner
  $.get(`https://api.github.com/repos/${owner}/${repo}/commits`)
    .done(function(data) {
      $("#details").html(commitHTML(data))
    })
    .fail(displayError())
}

$(document).ready(function (){
});
