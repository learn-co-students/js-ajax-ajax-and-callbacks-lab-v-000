$(document).ready(function (){

  
});
  
  function searchRepositories() {
    let terms = $('#searchTerms').val()
    $.get(`https://api.github.com/search/repositories?q=${terms}`, function(repoData) {
      console.log(repoData)
      $('#results').html(
        repoData.items.map(function(repo) {
          return `<p><img src="${repo.owner.avatar_url}", style="width:100px;height=100px;"><a href="${repo.html_url}">${repo.name}</a> - ${repo.description} - <a href="${repo.owner.html_url}">${repo.owner.login}</a></p>` 
        })
        );
	  });
  }
  