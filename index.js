$(document).ready(function (){
});


function searchRepositories() {
  const searchTerms = document.getElementById('searchTerms').value
  const searchUrl = `https://api.github.com/search/repositories?q=${searchTerms}`
  $.get(searchUrl, function(response) {
    $("#results").html(showRepositories(response))
  }).fail(function(error) {
    displayError()
  })
}

function displayError() {
    $("#errors").html("I'm sorry, there's been an error. Please try again.")
}

function showRepositories(response) {
  const repoTemplate = document.getElementById("repository-template").innerHTML
  const repoTemplateFn = Handlebars.compile(repoTemplate)
  return repoTemplateFn(response)
}

function showCommits(el) {
  const owner = el.dataset.owner
  const repo = el.dataset.repository
  const commitsUrl = `https://api.github.com/repos/${owner}/${repo}/commits`
  $.get(commitsUrl, function(response) {
    const commitTemplate = document.getElementById("commits-template").innerHTML
    const commitTemplateFn = Handlebars.compile(commitTemplate)
    $("#details").html(commitTemplateFn(response))
  }).fail(function(error) {
    displayError()
  })
}