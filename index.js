$(document).ready(function (){
});

function searchRepositories() {
  let search = document.getElementById('searchTerms').value
  $.get(`https://api.github.com/search/repositories?q=${search}`, function(data) {
    console.log(data.items)
    let repositoryTemplate = Handlebars.compile(document.getElementById('repository-template').innerHTML)
    let repo = repositoryTemplate(data.items)
    $('#results').html(repo)
  });
}
