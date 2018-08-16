$(document).ready(function (){
  $.get("https://api.github.com/search/repositories?q=tetris", function(data) {
    // Here we are getting the element on the page with the id of sentences and
    // inserting the response
    $(".results").html(data);
  });
});

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

function searchRepositories(searchTerms) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${
    repos.map(r => `<li> <a href="https://github.com/${r.owner.login}/${r.name}">` + r.name + '</a> - <a href="#" data-repository="' +
    r.name + '" onclick="getCommits(this)">Get Commits</a> - <a href="#" data-username="' + r.name +
      '" onclick="getBranches(this)">Get Branches</a></li>')
    .join('')
    }</ul>`
  document.getElementById("results").innerHTML = repoList
}

//
// <main id="main">
//     <a href="#" onclick="searchRepositories()">Search Repositories</a>
//     <div id="repositories"></div>
//   </main>
//   1.	Create a "Search Repositories" link that calls a searchRepositories function on click, takes the value of a searchTermstext input,
//   and queries the GitHub repository search API.


// function getRepositories() {
//   const req = new XMLHttpRequest()
//   req.addEventListener("load", displayRepositories);
//   req.open("GET", 'https://api.github.com/users/octocat/repos')
//   req.send()
// }
//
// function displayRepositories(event, data) {
//   var repos = JSON.parse(this.responseText)
//   console.log(repos)
//   const repoList = `<ul>${
//     repos.map(r => `<li> <a href="https://github.com/${r.owner.login}/${r.name}">` + r.name + '</a> - <a href="#" data-repository="' +
//     r.name + '" onclick="getCommits(this)">Get Commits</a> - <a href="#" data-username="' + r.name +
//       '" onclick="getBranches(this)">Get Branches</a></li>')
//     .join('')
//     }</ul>`
//   document.getElementById("repositories").innerHTML = repoList
// }


// function showRepositories(event, data) {
//   var repos = JSON.parse(this.responseText)
//   console.log(repos)
//   const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
//   document.getElementById("repositories").innerHTML = repoList
// }
