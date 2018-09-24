$(document).ready(function (){

  
});
  
  function searchRepositories() {
    let terms = $('#searchTerms').val()
    $.get(`https://api.github.com/search/repositories?q=${terms}`, function(repoData) {
      console.log(repoData)
      $('#results').html(
        repoData.items.map(function(repo) {
          return `<p><a href="${repo.html_url}">${repo.name}</a> - ${repo.description}</p>` 
        })
        );
	  });
  }
  