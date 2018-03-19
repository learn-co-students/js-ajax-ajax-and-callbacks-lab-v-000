$(document).ready(function (){
});

// const gitHubUrl = 'https://api.github.com/search/repositories' 

function searchRepositories(){
  searchTerm = $("#searchTerms")[0].value
  $.get("https://api.github.com/search/repositories" , {q : searchTerm}, showRepositories)
} 

function showRepositories(response){
  repos = '<ul>' + response.items.map(r=> {
    return (`
    <li>
    <a href="${r.html_url}">${r.name}</a> - ${r.description || "No Description"}
    </p>`
    )
  }).join("") + '</ul>' 
  $("#results")[0].innerHTML = repos
}

function searchCommits(){

}

function showCommits(){

}