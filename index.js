$(document).ready(function (){
});
  
  function searchRepositories() {
   const searchTerms = document.getElementById("searchTerms").value
   const url = `https://api.github.com/search/repositories?q=${searchTerms}`
   $.get(url, function(response) {
    $('#results').html(searchResults(response))
   }).fail(displayError())
  }

  function searchResults(results) {
    return `<ul>${results.items.map(r => '<li>' + r.name + ' - ' + 'Description:' + r.description +` - <a href=${r.html_url}>${r.html_url}</a>` +
           '- <a href="#" data-repository="' + r.name + '" data-owner="'+r.owner.login+'" onclick="showCommits(this)">Get Commits</a>' +
           
    '</li>').join('')}</ul>`
  }

  function showCommits(repo) {
   const owner = repo.dataset.owner
   const repository = repo.dataset.repository
   const url = `https://api.github.com/repos/${owner}/${repository}/commits`
   $.get(url, function(response) {
    $('#details').html(displayCommits(response))
   })
  }

  function displayCommits(commits) {
    return `<ul>${commits.map(c => '<li>' + c.sha + '-' + c.author.login + '-' + '<img src="${result.owner.avatar_url}" width="32" height="32" />' + '</li>')} </ul>`
  }

  function displayError() {
    //console.log("I'm sorry, there's been an error. Please try again.")
    $('#errors').html("I'm sorry, there's been an error. Please try again.")
  }

