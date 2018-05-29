$(document).ready(function (data){
  $.get("index.html",function(response){
    searchRepositories()
  })
});

function searchRepositories(){
  const repos = JSON.parse(this.responseText)
  const repoList = repos.map(r => {return '<li><a href="' + r.html_url + '">' + r.name + '</a></li>'}).join('')
  document.getElementById("results").innerHTML = repoList
}

function showCommits(){

}
