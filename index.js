function searchRepositories() {
  let searchterm = document.getElementById('searchTerms').value
  $.get(`https://api.github.com/search/repositories?q=${searchterm}`, data => {
    $("#results").html(displaySearchResults(data))
  }).fail(error => {
    displayError()
  })
}

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

function displaySearchResults(searchResults) {
  console.log(searchResults)
  const results = '<ul>' +
  searchResults.items
    .map(searchResult => {
      const dataUsername = 'data-userName="' + searchResult.owner.login + '"'
       const dataRepoName = 'data-repo="' + searchResult.name + '"'
      return `
         <li>
           <h2>${searchResult.name} - ${searchResult.description} </h2>
           <a href="${searchResult.html_url}">${searchResult.html_url}</a><br>
           <p> Owner login: ${searchResult.owner.login}</p><br>
           <img src="${searchResult.owner.avatar_url}" height="32" width="32"><br>
           <a href="${searchResult.owner.html_url}">${searchResult.owner.html_url}</a><br>
           <a href="#" ${dataRepoName} ${dataUsername} onclick="showCommits(this)">Show Commits</a><br>
         </li>`

    })
    .join('') + '</ul>'
    return results
}

function showCommits(el) {

  let repoName = el.dataset.repository
  let userName = el.dataset.owner

  $.get(`https://api.github.com/repos/${userName}/${repoName}/commits`, data => {
    $("#details").html(showCommitsDetails(data))
  }).fail(error => {
    displayError()
  })
}

function showCommitsDetails(commits) {
  console.log(commits)
  debugger
  const results = '<ul>' +
  commits
  .map(commit => {
    return `
       <li>
         <h2>${commit.commit.author.name} - ${commit.author.login} </h2>
         <p> SHA: ${commit.sha} </p><br>
         <img src="${commit.author.avatar_url}" height="32" width="32"><br>
       </li>`
  })
  .join('') + '</ul>'
  return results
}

$(document).ready(function (){
});
