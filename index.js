$(document).ready(function (){
  $.get('https://api.github.com/search/repositories?q=tetris', searchRepositories(searchTerms) {
    // Here we are getting the element on the page with the id of sentences and
    // inserting the response
    $("#results").html(searchTerms);
  });
});

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
function searchRepositories(searchTerms) {
}
//
// <main id="main">
//     <a href="#" onclick="searchRepositories()">Search Repositories</a>
//     <div id="repositories"></div>
//   </main>
//   1.	Create a "Search Repositories" link that calls a searchRepositories function on click, takes the value of a searchTermstext input,
//   and queries the GitHub repository search API.
