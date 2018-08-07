$(document).ready(function (){  
});

function searchRepositories(){
  let terms = $("#searchTerms").val();
  $.get(`https://api.github.com/search/repositories?q=${terms}`, function(response){
    const repoList = "<ul>" + response.items.map(r => {
      const repository = r.name
      const owner = r.owner.login
      return (
        `<li>
          <h2><a href="${r.url}">${repository}</a></h2>
          <p>Description: ${r.description}</p>
          <a href="#" data-repository="${repository}" data-owner="${owner}" onclick="showCommits(this);">Show Commits</a>
          <h3>Owner: <a href="${r.owner.url}">${owner}</a></h3>
          <img src="${r.owner.avatar_url}">
        </li>`
      )
    }).join('') + "</ul>";
    $("#results").html(repoList)
  }).fail(displayError());
}

function showCommits(repoData){
  let repository = repoData.dataset.repository
  let owner = repoData.dataset.owner
  $.get(`https://api.github.com/repos/${owner}/${repository}/commits`, function(commits){
    const commitList = "<ul" + commits.map(c =>{
      return (
        `<li>
          <h4>SHA: <a href="${c.url}">${c.sha}</a><h4>
          <p>Author: ${c.committer.name}</p>
          <p>Login: ${c.committer.login}</p>
          <img src="${c.committer.avatar_url}">
        </li>`
      )
    }).join('') + "</ul>";
    $("#details").html(commitList);
  }).fail(displayError());
}

function displayError(){
  $('#errors').html("I'm sorry, there's been an error. Please try again;")
}
