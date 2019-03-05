$(document).ready(function (){

});

function searchRepositories(){
  let search = document.getElementById('searchTerms').value;
  search = search.replace(/ /g, "+")
  console.log(search);
  document.getElementById('errors').innerHTML = ""
  $.get(`https://api.github.com/search/repositories?q=${search}`, displayRepositories).fail(displayError);
}

function displayRepositories(data){
  console.log(data);
  const src = document.getElementById('repository-template').innerHTML;
  const template = Handlebars.compile(src);
  const repoList = template(data);
  document.getElementById('results').innerHTML = repoList;
}

function showCommits(link){
  document.getElementById('errors').innerHTML = ""
  $.get(`${link.dataset.url.replace("{/sha}","")}`, displayCommits).fail(displayError);
}

function displayCommits(data){
  console.log(data);
  const src = document.getElementById('commits-template').innerHTML;
  const template = Handlebars.compile(src);
  const commitList = template(data);
  document.getElementById('details').innerHTML = commitList;
}

function displayError(){
  document.getElementById('errors').innerHTML = "I'm sorry, there's been an error. Please try again."
}
