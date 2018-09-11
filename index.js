
// 1. Create a "Search Repositories" link that calls a `searchRepositories` function on click, takes the
// value of a `searchTerms` text input, and queries the GitHub repository search API.

//https://api.github.com/search/repositories?q=tetris

function searchRepositories(){
  // $('a').on('click', function() {
  const input = $("#searchTerms").val()
  // })
  debugger
  $.ajax({
      // The URL for the request
      url: `api.github.com/search/repositories/${input}`,

      // Whether this is a POST or GET request
      type: "GET",
      // The type of data we expect back
      dataType : "json"
  })
}
