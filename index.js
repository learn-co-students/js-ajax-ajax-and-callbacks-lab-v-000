var url = 'api.github.com/search/repositories'
var searchTerms = $('#searchTerms')

$(document).ready(function (){
  $.get(url + "/" + searchTerms, function(response) {
    searchRepositories();
  }).fail(function(error) {
    displayError();
});

function searchRepositories() {
 $("results")
   .append("Name" + response.name)
   .append("Description" + response.description)
   .append("URL" + response.url)
   .append(response.owner.login)
   .append(response.owner.avatar)
   .append(response.owner.homepage)
 })

 function displayError() {
   $('#errors').innerHTML += "I'm sorry, there's been an error. Please try again."
 }
