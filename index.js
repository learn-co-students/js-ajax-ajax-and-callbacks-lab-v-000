$(document).ready(function (){
});

// const gitHubUrl = 'https://api.github.com/search/repositories' 

function searchRepositories(){
  searchTerm = $("#searchTerms")[0].value
  $.get("https://api.github.com/search/repositories" , {q : searchTerm}, showRepositories).fail(displayError)
} 

function showRepositories(response){
  // let userInfo = 
  const repos = '<ul>' + response.items.map(r=> {
    return (`
    <li>
      <img class="avatar" src="${r.owner.avatar_url}">
      <a href="${r.owner.url}">${r.owner.login}</a>
      <a href="${r.html_url}">${r.name}</a> - ${r.description || "No Description"}
      <a href="#" data-owner="${r.owner.login}" data-repository="${r.url}" onclick="showCommits(this); return false;">Show Commits</a>
    </li>`
    )
  }).join("") + '</ul>' 
  $("#results")[0].innerHTML = repos
}

function showCommits(el){
// const userName = event.dataset.owner
const repoApiUrl = `https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`
$.get(repoApiUrl, displayCommits).fail(displayError)
}

function displayCommits(event, data){
  let commits = '<ul>' + event.map(r=> {
    return (`
      <li><img class="avatar" src="${r.author.avatar_url}">        
        <ul>
          <li>${r.commit.author.name}</li>
          <li>${r.author.login}</li>
          <li>${r.sha}</li>         
        </ul>
      </li>`
     )
  }).join("") + '</ul>';
  $("#details")[0].innerHTML = commits
}

function displayError(){
  $("#errors")[0].innerHTML = "<p> I'm sorry, there's been an error. Please try again. </p>"
}
