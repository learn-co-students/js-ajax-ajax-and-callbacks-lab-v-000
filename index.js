$(document).ready(function (){
});
// https://api.github.com/search/repositories?

function searchRepositories() {
  var searchValue = document.getElementById("searchTerms").value
  var url = "http://api.github.com/search/repositories?q=";
  $.get((url+searchValue), function(data) {
    console.log(data.items[0])
    console.log(data.items[0].name)
    $('#results').append("Name: " + data.items[0].name); //test line
    // $("#results").html(data.items[0].name);

    displayRepositories();
  }).fail(function(error) {
  // This is called when an error occurs
  console.log('Something went wrong: ', error);
  $('#errorMessage').html('Something went wrong.', error.statusText);
});
}

function displayRepositories() {
  $('#results').append("Name: "); //username?
}

$( document ).ajaxSuccess(function( event, request, settings ) {
  $( "#details" ).append( "<li>Successful Request!</li>" );
});

// $.get( "test.php", function( data ) {
//   $( "body" )
//     .append( "Name: " + data.name ) // John
//     .append( "Time: " + data.time ); //  2pm
// }, "json" );
