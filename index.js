$(document).ready(function (){

});

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.");
}

function searchRepositories() {
  const term = $('#searchTerms').val()
  $.get('https://api.github.com/search/repositories?q=' + term, function(response) {
    $('#repositories').html(response);
  }).fail(displayError());
}

//
// $(document).ready(function() {
//     // $.get('sentence.html', function(response) {
//     //     $('#sentences').html(response);
//     // });
//     $.get('this_doesnt_exist.html', function(data) {
//         // This will not be called because the .html file request doesn't exist
//         doSomethingGood();
//     }).fail(function(error) {
//         // This is called when an error occurs
//         console.log('Something went wrong: ' + error.statusText);
//     });
// });
