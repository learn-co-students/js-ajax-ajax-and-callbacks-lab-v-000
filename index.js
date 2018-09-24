$(document).ready(function (){

  
});
  
  function searchRepositories() {
    let terms = $('#searchTerms').val()
    $.get(`https://api.github.com/search/repositories?q=${terms}`, function(repoData) {
      console.log(repoData)
      $('#results').html(
        repoData.items.map(function(repo) {
          return `<div style="display:flex"><img src="${repo.owner.avatar_url}", style="max-width:100px;max-height:100px;float:left;"><p style="padding-left:15px"><a href="${repo.html_url}">${repo.name}</a> - ${repo.description} - <a href="${repo.owner.html_url}">${repo.owner.login}</a> - <a href="#" onclick="showCommits(this)">Show Commits</a></p></div>` 
        })
        );
	  });
  }
  
  function showCommits(commits) {
    
  }
  