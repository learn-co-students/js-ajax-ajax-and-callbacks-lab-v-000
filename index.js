function displayError() {
  // The tests wants a Jquery call from $('#errors').html with a phrase in quotes that has error in it
  $('#errors').html('error')
}

function searchRepositories() {
  $.get('#searchTerms').val
}

$(document).ready(function (){
});
