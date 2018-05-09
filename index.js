$(document).ready(function (){
});

//takes the value of a searchTerms text input, and queries the GitHub repository search API.
function searchRepositories() {
  //grab the search terms (by id) that the user enters
  const searchTerms = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
      //Display the collection of repositories inside the results div.
      $('#results').html(renderSearchResults(data))
    }).fail(error => {
      displayError()
    })
}

function renderSearchResults(data) {
  if (data.total_count > 0) {
    return data.items.map(result => {
      return `
        <div>
          <h2><a href="${result.html_url}">${result.name}</a></h2>
          <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
          <p>${result.description}</p>
        </div>
      `
    })
  } else {
    return `<h3>No matches :( )<h3>`
  }
}
//Display the collection of repositories inside the results div. Include repository name, description,
//and a link to the HTML URL. Also include repository owner login, repository owner avatar as an image,
//and a link to the owner's profile page. Hint: Pay close attention to the structure of the search results!

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}
//grab div with id of 'errors'
//Set the content with an error message

function showCommits(el) {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
    $('#details').html(renderCommits(data))
  }).fail(error => {
    displayError()
  })
}
// Add a "Show Commits" link to each repository result that will call a showCommits function that gets the
// repository's commits from the GitHub API and display them in the details div. For each commit, list the SHA,
// the author, the author's login, and the author's avatar as an image.


function renderCommits(data) {
  let result = data.map((commit)=>renderCommit(commit)).join('')
  return `<ul>${result}</ul>`
}

function renderCommit(commit) {
  return `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
}
