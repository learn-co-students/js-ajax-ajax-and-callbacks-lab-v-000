function displayError(){
  $('#errors').html("I'm sorry, there's been an error. Please try again.");
}

function commitListItem(commit){
  return `<li>
    <p>SHA: ${commit.sha}</p>
    <section><header><h4>Created By ${commit.commit.author.name}</h4></header>
    <p>Login: ${commit.committer.login}</p>
    <img src="${commit.committer.avatar_url}" height="32" width="32"></section>   
  </li>`
}

function commitListItems(response){
  let commitListItemsString = response.map( (commit) => commitListItem(commit)).join('')
  return commitListItemsString
}

function ownerDetails(repo){
  return `<header><h4>Created By ${repo.owner.login}</h4></header>
  <img src="${repo.owner.avatar_url}" height="32" width="32">`
}

function repoListItem(repo){
  return `<li>
     <h2><a href="${repo.html_url}">${repo.name}</a></h2>
     <section>${ownerDetails(repo)}</section>
     <p>Description: ${repo.description}</p>
     <a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}" onclick="showCommits(this)">Show Commits</a>
   </li>`
}

function repoListItems(response){
  let repos = response.items
  let repoListItemsString = repos.map( (repo) => repoListItem(repo)).join('')
  return repoListItemsString
}

//GET /search/repositories
// q string  Required. The search keywords, as well as any qualifiers.
// /search/repositories?q=tetris
function searchRepositories() {
  const searchTerms = $("#searchTerms").val();
  const searchTermsURL = "https://api.github.com" + "/search/repositories?q=" + searchTerms
  $.get(searchTermsURL).done(function(response){
    console.log(response.items)
    $('#results').html('<ul>'+ repoListItems(response)+ '</ul>');
  }).fail(displayError);
}


// GET /repos/:username/:repo/commits
function showCommits(element){
  const repoURL = `https://api.github.com/repos/${element.dataset.owner}/${element.dataset.repository}/commits`
  $.get(repoURL).done(function(response){
    console.log(response)
    $('#details').html('<ul>'+ commitListItems(response)+ '</ul>');
  }).fail(displayError);
}