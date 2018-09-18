var listCommit = (commit) => {
  return `
    <li>
      <h3>${commit.sha}</h3>
      <p>${commit.commit.message}</p>
      <p>Commit by ${commit.commit.author.name} (${commit.author.login})</p>
      <img src="${commit.author.avatar_url}">
    </li>
  `
}

var listCommits = (commits) => {
  let result = commits.map(commit => listCommit(commit)).join('')
  return `
    <ul>${result}</ul>
  `
}
// listCommits variable stores an anonymous arrow function
// that accepts the commits array of commit objects as its parameter
// the body of the arrow function comes after the arrow
// Call .map() on the commits array of commit objects
// to return an array of string <li> elements resulting from invoking the listCommit(commit) callback function
// with each commit object in the commits array
// call .join('') on the resulting array because we don't want <li>s separated by commas in the <ul>
// and store the string HTML of <li>s in result variable
// interpolate result variable (containing <li>s) inside the <ul> and return <ul>

var showCommits = (el) => {
  const ownerName = el.dataset.owner;
  const repoName = el.dataset.repository;
  $.get(`https://api.github.com/repos/${ownerName}/${repoName}/commits`, commits => {
    $('#details').html(listCommits(commits))
  }).fail(error => displayError())
}
// According to the GitHub API documentation, to list commits on a repository, use:
// GET /repos/:owner/:repo/commits
// so I need the repo's owner's login to replace the :owner route variable (dynamic segment) in URL
// and I need the name of the repo to replace the :repo route variable (dynamic segment) in URL
// showCommits variable stores an anonymous arrow function, which is passed the parameter el
// where el represents the <a> link tag element that was coded in the displayRepo function
// This <a> link has the properties data-owner and data-repository
// (data attributes for the login of user who owns the repo and the name of the repo)
// The values of these data attributes can be interpolated into the URL string
// to replace the :owner and :repo route variables
// ownerName variable stores the string corresponding to the data-owner property of the <a> tag and is accessed as el.dataset.owner
// repoName variable stores the string corresponding to the data-repository property of the <a> tag and is accessed as el.dataset.repository
// Then call jQuery ($) .get() function
// The 1st argument passed to .get() is the URL for the data we're seeking from GitHub API (i.e. the commits on a particular repo)
// The 2nd argument passed to .get() is a callback function that handles the response to our Ajax request,
// and this callback is written as an arrow function:
// commits is the argument passed to the arrow function (parentheses around commits are not necessary b/c only 1 parameter is passed in)
// commits is an array of commit objects
// After the arrow => comes the body of the function inside the curly brackets
// Inside the body of the arrow function, use jQuery to retrieve <div id="details"></div>
// And add the result of invoking listCommits(commits),
// where commits argument is the array of commit objects


var displayError = () => $('#errors').html("I'm sorry, there's been an error. Please try again.")
// The displayError variable stores an anonymous arrow function
// NO parameter is passed to the function, as indicated by the empty parentheses
// The function body comes after the arrow =>
// And because we're NOT enclosing the function body with {} brackets, we get implicit returns
// $('#errors') uses the jQuery ($) function to retrieve the <div id="errors">,
// into which we add the string "I'm sorry, there's been an error. Please try again."

var searchRepositories = () => {
  const searchKeywords = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${searchKeywords}`, response => {
    $('#results').html(displayRepos(response))
  }).fail(error => displayError())
}
// $('#searchTerms') is using the jQuery function ($) to retrieve the form field <input type="text" id="searchTerms">
// $('#searchTerms').val() retrieves the string value entered into the <input> form field,
// and we store this string value in searchKeywords variable
// Root URL for GitHub API: "https://api.github.com"
// According to GitHub Search API for Repositories, find repositories via various criteria using:
// GET /search/repositories
// Call the jQuery ($) .get() function. The 1st argument = the string URL for the data to be retrieved from GitHub API
// We append ?q=${searchKeywords} to the end of the URL string, interpolating the value of searchKeywords variable,
// which is whatever the user entered into the <input> form field
// The 2nd argument passed to jQuery ($) .get() function = the callback function that handles the response to our Ajax request
// I declare the callback function as an anonymous arrow function whose argument is response
// (the parameter passed to the callback arrow function can be inside parentheses,
// but since there's only 1 parameter, response, parentheses are not necessary)
// The body of the callback arrow function is inside the curly brackets {}
// The response argument of the callback function is the response returned from our Ajax request to retrieve repos that match the search criteria entered in field
// Looking at GitHub Search API for repositories, the response is an object with a key of "items"
// that points to an array of repo objects
// In the body of the arrow function:
// $('#results') retrieves <div id="results"></div>,
// into which we add the result of invoking the displayRepos(response) function,
// which takes the response to our Ajax request as an argument
// we chain on a call to .fail(), which takes an anonymous arrow function as its argument
// This arrow function is passed a parameter of error (an error object)
// The body of the arrow function is the invocation of displayError(error) function

var displayRepo = (repo) => {
  return `
    <div>
      <h2><a href="${repo.html_url}">View ${repo.name} on GitHub</a></h2>
      <p>${repo.description}</p>
      <p><a href="#" data-owner="${repo.owner.login}" data-repository="${repo.name}" onclick="showCommits(this)">Show Commits</a></p>
      <p><a href="https://github.com/${repo.owner.login}">View ${repo.owner.login}'s GitHub Profile</a></p>
      <img src="${repo.owner.avatar_url}">
    </div>
    <hr>
  `
}
//function displayRepo(repo) {
//  return `
//    <div>
//      <h2><a href="${repo.html_url}">View ${repo.name} on GitHub</a></h2>
//      <p>${repo.description}</p>
//      <p><a href="#" data-username="${repo.owner.login}" data-repository="${repo.name}" onclick="showCommits(this)">Show Commits</a></p>
//      <p><a href="https://github.com/${repo.owner.login}">View ${repo.owner.login}'s GitHub Profile</a></p>
//      <img src="${repo.owner.avatar_url}">
//    </div>
//    <hr>
//  `
//}

function displayRepos(response) {
  return response.items.map(repo => displayRepo(repo))
}
// Explanation of displayRepos(response):
// The response argument is the JSON response from our Ajax request to retrieve repos matching search criteria submitted in form field
// response object has an "items" key that points to an array of repo objects
// We call .map() on the items array of repo objects
// .map() calls a provided callback function once for each element in an array and constructs a new array from the results
// So, for each repo object in the items array of repo objects, we are invoking the displayRepo(repo) function,
// passing in the current repo object as the argument
// The function displayRepos(response) can also be written as an arrow function:
// var displayRepos = (response) => response.items.map(repo => displayRepo(repo))
// Note: we get implicit returns here because we're NOT using {} brackets around the arrow function's body
// Note: parentheses around (response) are optional b/c only 1 parameter is passed to arrow function
$(document).ready(function (){
});
