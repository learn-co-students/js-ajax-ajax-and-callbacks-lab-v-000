$(document).ready(function (){
  Handlebars.registerPartial(
    'authorPartial',
    document.getElementById('author-partial-template').innerHTML
  );
});



function displayError(){
  document.getElementById('errors').innerHTML = "I'm sorry, there's been an error. Please try again."
}

//GET /search/repositories
// q string  Required. The search keywords, as well as any qualifiers.
// /search/repositories?q=tetris
function searchRepositories() {
  const searchTerms = document.getElementById("searchTerms").value
  const searchTermsURL = "https://api.github.com" + "/search/repositories?q=" + searchTerms
  $.get(searchTermsURL).done(function(response){
    console.log(response.items)
    const src = document.getElementById('repository-template').innerHTML;
    const template = Handlebars.compile(src);
    const repoList = template(response.items);
    document.getElementById('results').innerHTML = repoList;
  }).fail(displayError);
}


// GET /repos/:username/:repo/commits
function showCommits(element){
  const name = element.dataset.name;
  const owner = element.dataset.owner;
  const repoURL = "https://api.github.com" +'/repos/'+owner+'/'+name+'/commits'
  $.get(repoURL).done(function(response){
    console.log(response)
    const src = document.getElementById('commits-template').innerHTML;
    const template = Handlebars.compile(src);
    const commitsList = template(response);
    document.getElementById('details').innerHTML = commitsList;
  }).fail(displayError);
}