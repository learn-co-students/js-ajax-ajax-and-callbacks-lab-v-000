$(document).ready(function (){
});

function searchRepositories() {
  const searchTerms = $('#searchTerms').val();
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
    $('#results').html(renderSearchResults(data))
  }).fail(displayError);
}

function renderSearchResults(data) {
  const repoList = '<ul>' + data.items.map(repo => {
    return (`
      <li>
        <h2><a href="$data.html_url">${repo.name}</a></h2>
        <p><a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}" onclick="showCommits(this); return false;">Show Commits</a></p>
        <p>${repo.description}</p>
      <li>
    `)
  }).join('') + '</ul>';
  return repoList
}

function showCommits(el) {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, function(data) {
    $('#details').html(renderCommits(data))
  }).fail(displayError);
}

function renderCommits(data) {
  const results = '<ul>' + data.map(commit => {
    return (`
      <li>
        <p>SHA: ${commit.sha}</p>
        <h3>Commits By: ${commit.commit.author.name}</h3>
        <h4>${commit.author.login}</h4>
        <img src="${commit.author.avatar_url}" height="32" width="32">
      </li>
    `)
  }).join('') + '</ul>';
  return results
}

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

/*Display the collection of repositories inside the results div.
Include repository name, description, and a link to the HTML URL.
Also include repository owner login, repository owner avatar as an image,
and a link to the owner's profile page.
Hint: Pay close attention to the structure of the search results!
Add a "Show Commits" link to each repository result that will call a
showCommits function that gets the repository's commits from the
GitHub API and display them in the details div.
For each commit, list the SHA, the author, the author's login,
and the author's avatar as an image.
Handle errors on each API call. If $.get fails,
call a function displayError and display
"I'm sorry, there's been an error. Please try again." in the errors div.
Hint: You can test your error callbacks by turning off Wi-Fi or temporarily changing the URL you use in the $.get request.*/
