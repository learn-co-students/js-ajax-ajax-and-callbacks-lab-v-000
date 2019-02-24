$(document).ready(function (){

});

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.");
}

function renderItems(item) {
    return `<h1>${$('#searchTerms').val()}</h1>
      <h2>${item.name}</h2>
      <p>${item.description}</p>
      <a href="${item.html_url}">View on Github</a>
      <hr>`
}

function renderResults(data) {
  return data.items.map(item => renderItems(item));
}

function searchRepositories() {
  const term = $('#searchTerms').val();
  // console.log(`https://api.github.com/search/repositories?q=${term}`)
  $.get(`https://api.github.com/search/repositories?q=${term}`, function(response) {
    $('#results').html(renderResults(response))
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
