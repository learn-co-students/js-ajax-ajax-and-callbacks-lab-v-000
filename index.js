$(document).ready(function (){
});

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.");
}

function searchRepositories () {
  let searchTerms = document.getElementById('searchTerms').value;
  $.get(`https://api.github.com/search/repositories?q=#{searchTerms}`, function(data) {
    displayRepositories();
  }).fail(function(error){
    displayError();
  })
}
