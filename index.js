
// 1. Create a "Search Repositories" link that calls a `searchRepositories` function on click, takes the
// value of a `searchTerms` text input, and queries the GitHub repository search API.

//https://api.github.com/search/repositories?q=tetris

function searchRepositories(){
  const input = $("#searchTerms").val()
  // $('a').on('click', function() {

  // })
  //debugger
  // $.get(`https://api.github.com/search/repositories?q=${input}`, function(response) {
  //         // Here we are getting the element on the page with the id of sentences and
  //         // inserting the response
  //         displayRepos(response);
  //     });
  $.ajax({
      // The URL for the request
      //url: 'https://www.runnersworld.com/',
      url: `https://api.github.com/search/repositories?q=${input}`,
      // Whether this is a POST or GET request
      type: "GET",

      // // The type of data we expect back
      // dataType : "JSON"
  }).done(function(response){
    // console.log(response);
      displayRepos(response);

  }).fail(function(error){
      displayError(error);
  })

    // Another option to get the URL is to use GET function instead of the AJAX function
  // $.get(`https://api.github.com/search/repositories?q=${input}`, function(response){
  //     displayRepos(response);
  // }).fail(function(error){
  //     displayError(error);
  // })
}

function displayRepos(response) {
   debugger
  // (these two lines of code right below were not needed as the 'response' from the server was already parsed to JSON)
  // var repos = JSON.parse(response);
  // console.log(repos);
//   const repoList = `<ul>${response.items
//     .map(repo => '<li>' + repo.name + repo.description + repo.html_url + repo.owner.login + repo.owner.avatar_url + repo.owner.url +
//     "<a href="#" onclick="showCommits()"> Show Commits</a>"+ '</li>')
//     .join('')}</ul>`;
//   document.getElementById('results').innerHTML = repoList;
// }

  const repoList = `<ul>${response.items
    .map(repo => '<li>' + repo.name + repo.description + repo.html_url + repo.owner.login + repo.owner.avatar_url + repo.owner.url +
    '<a href="#" onclick="showCommits(this)" data-owner="' + repo.owner.login + '"data-repository="' + repo.name + '"> Show Commits</a>' + '</li>')
    .join('')}</ul>`;
  document.getElementById('results').innerHTML = repoList;
}

function displayError(error) {
  //debugger
  error = "I'm sorry, there's been an error. Please try again.";
  //$('#errors').html(error);
  document.getElementById('errors').innerHTML = error;
};

// 3. Add a "Show Commits" link to each repository result that will call a `showCommits` function that
// gets the repository's commits from the GitHub API and display them in the `details` div.
// For each commit, list the SHA, the author, the author's login, and the author's avatar as an image.

//https://api.github.com/repos/owner/repo/commits/

function showCommits(el) {
  //const el = { dataset: { repository: "repo", owner: "owner" } }
  debugger
  //'https://api.github.com/search/repositories?q=${input}'
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, function(response){
    console.log(response);
    const commitsList = `<ul>${response.map(com => '<li>' + com.sha + com.commit.author.name + com.commit.author.login + com.commit.author.avatar + '</li>').join('')}</ul>`;
    document.getElementById('details').innerHTML = commitsList;
  })
}


// function getCommits(el) {
//   const name = el.dataset.repository
//   const req = new XMLHttpRequest()
//   req.addEventListener("load", displayCommits)
//   req.open("GET", 'https://api.github.com/repos/octocat/Spoon-Knife/commits')
//   req.send()
// }
//
// function displayCommits() {
//   const commits = JSON.parse(this.responseText)
//   const commitsList = `<ul>${commits.map(commit => '<li>' + commit.author.login + ' <strong>' + commit.commit.author.name + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
//   document.getElementById("details").innerHTML = commitsList
// }

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
