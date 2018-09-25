$(document).ready(function (){

  
});
  
  function searchRepositories() {
    let terms = $('#searchTerms').val()
    $.get(`https://api.github.com/search/repositories?q=${terms}`, function(repoData) {
      $('#results').html(
        repoData.items.map(function(repo) {
          return `<div style="display:flex"><img src="${repo.owner.avatar_url}", style="max-width:100px;max-height:100px;float:left;"><p style="padding-left:15px"><a href="${repo.html_url}">${repo.name}</a> - ${repo.description} - <a href="${repo.owner.html_url}">${repo.owner.login}</a> - <a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}" onclick="showCommits(this)">Show Commits</a></p></div>` 
        })
        );
	  }).fail(function() {
      displayError()
    })
  }
  
  function showCommits(repository) {
   let repoName = repository.dataset.repository;
   let repoOwner = repository.dataset.owner;
    $.get(`https://api.github.com/repos/${repoOwner}/${repoName}/commits`, function(repoData) {
        console.log(repoData)
        $('#details').html(
          repoData.map(function(commit) {
             return `<ul><li>${commit.sha} - ${commit.commit.author.name} - ${commit.author.login}</li></ul>`
          })
          )
    }).fail(function() {
      displayError()
    })
  }
  
  function displayError() {
    $('#errors').html("I'm sorry, there's been an error. Please try again.")
  }
  