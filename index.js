
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
      url: `https://api.github.com/search/repositories?q=${input}`,

      // Whether this is a POST or GET request
      type: "GET",
      // The type of data we expect back
      dataType : "json"
  }).done(function(response){
      displayRepo(response);
  })
}

// 2. Display the collection of repositories inside the `results` div. Include repository name, description,
// and a link to the HTML URL. Also include repository owner login, repository owner avatar as an image,
// and a link to the owner's profile page. **Hint:** Pay close attention to the structure of the search results!

function displayRepo(){
  $("#results").html(data)
  data.forEach(r => {
    $('#results').append('<li>' + r.items.name + r.items.description + r.items.owner.login + r.items.avatar_url + r.items.owner.url'</li>')
  })
}
