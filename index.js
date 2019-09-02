const rootURL = "https://api.github.com"

$(document).ready(function (){
  
 

  
});

function displayError() {
  const errorDiv = document.getElementById("errors")
  errorDiv.innerHTML = "I'm sorry, there's been an error. Please try again.";
  return errorDiv
}

function searchRepositories() {
  var userInput = document.getElementById('searchTerms').value;
 
  let url = `https://api.github.com/search/repositories?q=${userInput}`
  
  $.get(url)
  .done(function(data) {
    console.log("Done");
    console.log(data);
    displaysRepositories(data)
    
  })
  .fail(function(error){
    displayError()
  })
}

function displaysRepositories(el) {
  const repos = el["items"]
  
  const repoList = "<ul>" + repos.map(repo => {
   
  const owner = repo.owner.login
  const repoName = repo.name

  return(`
   <li>
   <h2>${repo.name}</h2>
   <h3> ${repo.description}</h3>
   <a href="${repo.html_url}">${repo.html_url}</a><br>
   <p>${repo.owner.login}</p>
   <img src="${repo.owner.avatar_url}" width="100" height="100"><br>
   <a href="${repo.owner.html_url}">${repo.owner.html_url}</a><br>
   <a href="#" data-repository=${repoName} data-username=${owner} onclick="showCommits(this)">Get Commits</a><br>
   </li>`
  )
 }) + "</ul>"
 document.getElementById("results").innerHTML = repoList
} //displaysRepositories


function showCommits(re) {
  debugger
  
  let uri = `${rootURL}/repos/${re.dataset.owner}/${re.dataset.repository}/commits`
 
   $.get(uri)
  .done(function(data) {
    console.log("Done");
    console.log(data);
    displaysCommits(data);
    
  })
  .fail(function(error){
    displayError()
  })
 
}

function displaysCommits(el) {
  let commitList = "<ul>" + el.map(commit => {

  return(`
   <li>
   <h2>SHA: ${commit.sha}</h2>
   <h3>Author: ${commit.commit.author.name}</h3>
   <h3>Author Login: ${commit.author.login}</h3>
   <img src="${commit.author.avatar_url}" width="50" height="50">
   </li>`
  )
 }) + "</ul>"
 document.getElementById("details").innerHTML = commitList
 
}


