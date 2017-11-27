$(document).ready(function (){
  Handlebars.registerPartial("authorPartial", document.getElementById("author-partial-template").innerHTML);
});

function searchRepositories() {
  const searchTerms = $('#searchTerms').val();
  const rootUri = "https://api.github.com/search/repositories?q="
  
  $.get(rootUri + searchTerms, function(data) {
  })
  .done(function(data) {
    showRepositories(data);
  })
  .fail(function(error){
    displayError();
  });
}

function showRepositories(data) {
  const src = document.getElementById('repository-template').innerHTML;
  const template = Handlebars.compile(src);
  const repoList = template(data.items);
  document.getElementById('results').innerHTML = repoList;
}

function showCommits(el) {
  const repository = `${el.dataset.owner}/${el.dataset.repository}`;
  $.get(`https://api.github.com/repos/${repository}/commits`, function(data) {
  })
  .done(function(data) {
    const src = document.getElementById('commit-template').innerHTML;
    const template = Handlebars.compile(src);
    const commitList = template(data);
    document.getElementById('details').innerHTML = commitList;
  })
  .fail(function(error) {
    displayError();
  });
}

function displayError() {
  $('#errors').append("<strong>I'm sorry, there's been an error. Please try again.</strong>");
}
