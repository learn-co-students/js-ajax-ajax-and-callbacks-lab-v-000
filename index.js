
function searchRepositories(){
  debugger;
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories);
  req.open("GET", "https://api.github.com/search/repositories?q=octocat")
  req.send()
}

function showRepositories(){
const repos = JSON.parse(this.responseText)
const src = document.getElementById("repository-template").innerHTML
const template = Handlebars.compile(src)
const repoList = template(repos)

document.getElementById("results").innerHTML = repoList
}

$(document).ready(function (){
});
