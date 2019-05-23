var displayError = () => $('#errors').html("I'm sorry, there's been an error. Please try again."))

$(document).ready(function (){
  $.get("this_doesnt_exist.html", function(data) {
  // This will not be called because the .html file request doesn't exist
  doSomethingGood();
}).fail(displayError(error))
})


document.addEventListener("DOMContentLoaded", function(event) {

  Handlebars.registerPartial("authorPartial", document.getElementById("author-partial-template").innerHTML)
});


function searchRepositories() {
  var searchTerm = document.getElementById('searchTerm').value;
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayResults);
  req.open("GET", 'https://api.github.com/search/repositories?q=' + searchTerm).fail(error => {displayError()})
  req.send()
}



function displayResults(event, data) {
  var repos = JSON.parse(this.responseText)

  for (const element of repos.items) {
    element.commits_url = element.commits_url.slice(0,element.commits_url.length-6)
  }
  console.log(repos.items)
  // const repoList = `<ul>${repos.map(r => '<li>' + r.name + r.description + ' - <a href="' + r.html_url + '" data-repo="' + r.name + '">Go to Repo</a> </li>').join('')}</ul>`
  // document.getElementById("results").innerHTML = repoList

  const src = document.getElementById("repository-template").innerHTML
  const template = Handlebars.compile(src)
  const repoList = template(repos.items)

  document.getElementById("results").innerHTML = repoList

}




function showCommits(el) {

  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", el.name).fail(error => {displayError()})
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  console.log(commits)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login +'-'+ commit.commit.author.name + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}
