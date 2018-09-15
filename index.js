
// 1. Create a "Search Repositories" link that calls a `searchRepositories` function on click, takes the
// value of a `searchTerms` text input, and queries the GitHub repository search API.

//https://api.github.com/search/repositories?q=tetris

function searchRepositories(){
  // $('a').on('click', function() {
  const input = $("#searchTerms").val()
  // })
  //debugger
  // $.get(`https://api.github.com/search/repositories?q=${input}`, function(response) {
  //         // Here we are getting the element on the page with the id of sentences and
  //         // inserting the response
  //         displayRepos(response);
  //     });

  $.ajax({
      // The URL for the request
      url: `https://api.github.com/search/repositories?q=${input}`,

      // Whether this is a POST or GET request
      type: "GET",

      // // The type of data we expect back
      // dataType : "JSON"
  }).done(function(response){
    // console.log(response);
      displayRepos(response);
  })
}

function displayRepos(response) {
  //debugger
  // var repos = JSON.parse(response);
  //console.log(repos);
  const repoList = `<ul>${response.items
    .map(repo => '<li>' + repo.name + repo.description + repo.html_url + repo.owner.login + repo.owner.avatar_url + repo.owner.url + '</li>')
    .join('')}</ul>`;
  document.getElementById('results').innerHTML = repoList;
}

// function showRepositories() {
//   var repos = JSON.parse(this.responseText);
//   console.log(repos);
//   const repoList = `<ul>${repos
//     .map(r => '<li>' + r.name + '</li>')
//     .join('')}</ul>`;
//   document.getElementById('repositories').innerHTML = repoList;
// }
// function displayRepo(){
//   $("#results").html(data)
//   data.forEach(r => {
//     $('#results').append('<li>' + r.items.name + r.items.description + r.items.owner.login + r.items.avatar_url + r.items.owner.url + '</li>')
//   })
// }
// 2. Display the collection of repositories inside the `results` div. Include repository name, description,
// and a link to the HTML URL. Also include repository owner login, repository owner avatar as an image,
// and a link to the owner's profile page. **Hint:** Pay close attention to the structure of the search results!

// function displayRepo() {
//     $('#results').append('<ul>''<li>' + r.items.name + r.items.description + r.items.owner.login + r.items.avatar_url + r.items.owner.url + '</li>''</ul>')
//   })
// }

// addFollowersToDom = followersArray => {
//   $('.followers').empty()
//   followersArray.forEach(follower => {
//     $('.followers').append('<li>' + follower.login + '</li>')
//   })
// }
// //
// function displayRepo(){
//   $("#results").html(data)
//   data.forEach(r => {
//     $('#results').append('<li>' + r.items.name + r.items.description + r.items.owner.login + r.items.avatar_url + r.items.owner.url + '</li>')
//   })
// }
