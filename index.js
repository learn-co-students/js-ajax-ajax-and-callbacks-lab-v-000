$(document).ready(function (){
});

function searchRepositories() {
  var searchValue = document.getElementById("searchTerms").value
  var url = "http://api.github.com/search/repositories?q=";
  $.get((url+searchValue), function(data) {
    $('#results').append("Name: " + data.items[0].name); //test line

    displayRepositories();
  }).fail(displayError(error));
}

function displayError(error) {
$('#errors').html('Something went wrong.', error.statusText);
};

function displayRepositories() {
  $('#results').append("Name: "); //username?
}

$( document ).ajaxSuccess(function( event, request, settings ) {
  $( "#details" ).append( "<li>Successful Request!</li>" );
});
