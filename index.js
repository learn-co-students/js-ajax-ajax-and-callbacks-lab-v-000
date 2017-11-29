$(document).ready(function (){
  Handlebars.registerPartial("authorPartial", document.getElementById("author-partial-template").innerHTML)

});

function searchRepositories() {
  const searchTerms = document.getElementById("searchTerms").value;
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(response){
     $('#results').html(displayRepositories(response))
   }).fail(displayError())
}

function displayRepositories(data) {
  const src = document.getElementById("repository-template").innerHTML
  const template = Handlebars.compile(src)
  const repoList = template(data.items)

  document.getElementById("results").innerHTML = repoList
}

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.");
}

function showCommits(el) {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
    $('#details').html(displayCommits(data))
   }).fail(displayError())
}

function displayCommits(data) {
  const src = document.getElementById("commit-template").innerHTML
  const template = Handlebars.compile(src)
  const commitList = template(data)

  document.getElementById("details").innerHTML = commitList

}
