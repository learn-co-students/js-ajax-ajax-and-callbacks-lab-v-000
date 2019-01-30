



function searchRepositories(){
const searchTerms = document.getElementById('searchTerms').value
const searchURL = "https://api.github.com/search/repositories?q=" + searchTerms
console.log("Search URL is: " + searchURL)


// $(document).ready(function(){
$.get(searchURL, function(respond){
  //console.log(Object.keys(respond.items[0].owner))
  let reposHTML = "<ul>" +
  respond.items.map(
    repo =>{
    let name = repo.name
    let description = repo.description
    let url = repo.html_url
    let owner = repo.owner.login
    let ownerAvatar = repo.owner.avatar_url
    let ownerLink = repo.owner.html_url
return `<li><h3><a href='${url}'>${name}</a></h3>${description}<br><strong><a href='{ownerLink}'>${owner} <img src='${ownerAvatar}' height='20'></a><a href="#" onclick="showCommits(this)" data-owner=${owner} data-repository="${name}">Show Commits</a></li> `
  }).join("")
  + "</ul>"

  document.getElementById("results").innerHTML = reposHTML

}).fail(displayError)
// });
}

function showCommits(el){
  repository = el.dataset.repository
  repositoryOwner = el.dataset.owner
  let getCommitsURL = "https://api.github.com/repos/" + repositoryOwner + "/" + repository + "/commits"
  // $(document).ready(function(){
  $.get(getCommitsURL, function(respond){
  console.log(Object.keys(respond[0]))
    let commitsHTML = "<ul>" +
    respond.map(
      commit =>{
      let sha = commit.sha
      let authorName = commit.committer.name
      let authorLogin = commit.committer.login
      let authorAvatar = commit.committer.avatar_url
  return `<li><strong>${sha} ${authorName} <img src='${authorAvatar}' height='20'> ${authorLogin}</li>`
    }).join("")
    + "</ul>"

    document.getElementById("details").innerHTML = commitsHTML
  })
  // });
  }

  function displayError(){
    document.getElementById("errors").innerHTML = "I'm sorry, there's been an error. Please try again."
  }
