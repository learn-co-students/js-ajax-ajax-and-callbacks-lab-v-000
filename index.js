$('a').on('click', function() {
  const searchTerms = $("#user-input").val()

$(document).ready(function (){
  $.get("https://api.github.com/search/repositories?q=tetris", function(data) {
    searchRepositories();
  }).fail(function(errors){
    displayError();
});

function searchRepositories(){
  $("#results").html(data)
  data.forEach(r => {
    $('#results').append('<ul><li>' + r.items.name + r.items.description + r.items.owner.login + r.items.avatar_url + r.items.owner.url'</li></ul>')
  })
}


// // We should wait for the page to load before running our Ajax request
// $(document).ready(function(){
//   // Now we start the Ajax GET request. The first parameter is the URL with the data.
//   // The second parameter is a function that handles the response.
//   $.get("sentence.html", function(response) {
//     // Here we are getting the element on the page with the id of sentences and
//     // inserting the response
//     $("#sentences").html(response);
//   });
// });


// $.get("this_doesnt_exist.html", function(data) {
//   // This will not be called because the .html file request doesn't exist
//   doSomethingGood();
// }).fail(function(error) {
//   // This is called when an error occurs
//   console.log('Something went wrong: ' + error);
// });

// $.get( "ajax/test.html", function( data ) {
//   $( ".result" ).html( data );
//   alert( "Load was performed." );
// });

// // We should wait for the page to load before running our Ajax request
// $(document).ready(function(){
//   // Now we start the Ajax GET request. The first parameter is the URL with the data.
//   // The second parameter is a function that handles the response.
//   $.get("sentence.html", function(response) {
//     // Here we are getting the element on the page with the id of sentences and
//     // inserting the response
//     $("#sentences").html(response);
//   });
// });
//
// function searchRepositories(searchTerms) {
// }

//   1.	Create a "Search Repositories" link that calls a searchRepositories function on click, takes the value of a searchTerms text input,
//   and queries the GitHub repository search API.

// function searchRepositories(searchTerms) {
//   var repos = JSON.parse(this.responseText)
//   console.log(repos)
//   const repoList = `<ul>${
//     repos.map(r => `<li> <a href="https://github.com/${r.items.name}${r.items.description}${r.items.owner.login}${r.items.owner.avatar_url}${r.items.owner.url}">` + r.name + '</a>- <a href="#" data-repository="' +
//  + '" onclick="searchRepositories(this)">Search Repositories</a></li>')
//     .join('')
//     }</ul>`
//   document.getElementById("results").innerHTML = repoList
// }

// function searchRepositories(){
//   $("#results").html(data)
//   data.forEach(r => {
//     $('#results').append('<li>' + r.items.name + r.items.description + r.items.owner.login + r.items.avatar_url + r.items.owner.url'</li>')
//   })
// }

// addFollowersToDom = followersArray => {
//   $('.followers').empty()
//   followersArray.forEach(follower => {
//     $('.followers').append('<li>' + follower.login + '</li>')
//   })
// }

//Include repository name, description, and a link to the HTML URL. Also include repository owner login,
//repository owner avatar as an image, and a link to the owner's profile page.
// function searchRepositories(searchTerms) {
//   var repos = JSON.parse(this.responseText)
//   console.log(repos)
//   const repoList = `<ul>${
//     repos.map(r => '<li> + r.items.name + r.items.description + r.items.owner.login + r.items.owner.avatar_url + r.items.owner.url</li>').join('')}</ul>`
//   document.getElementById("results").innerHTML = repoList
// }

function displayError(){
  $("#errors").alert("I'm sorry, there's been an error. Please try again.");
};
//
// <main id="main">
//     <a href="#" onclick="searchRepositories()">Search Repositories</a>
//     <div id="repositories"></div>
//   </main>
