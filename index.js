function showReps(){
  let repsTerm = document.getElementById("searchTerm1").value
  document.getElementById("searchTerms").innerHTML = repsTerm
}


function searchRepositories(){
  const searchT = document.getElementById("searchTerms").value
  //  $('#searchTerms').val()
  //  =
// debugger;
$.get(`https://api.github.com/search/repositories?q=${searchT}`,function(response){
  console.log("r",response)
  const list = response.items.map(r=>{
    return `<li>
  <a href=${r.html_url}>${r.name}</a>
  <p>Rep name: ${r.name}</p>
  <p>Description: ${r.description}</p>
  <img src="${r.owner.avatar_url}">
  <p> Owner name: ${r.owner.login}</p>
  <a href="#"
   data-repository="${r.name}"
   data-owner="${r.owner.login}"
   onclick='showCommits(this)'> Get Commits </a>`
})
let repoList = `<ul> ${list}</ul>`
document.getElementById("results").innerHTML = repoList
  // const repos = JSON.parse(response)
  // const src = document.getElementById("repository-template").innerHTML
  // const template = Handlebars.compile(src)
  // const repoList = template(response)
}).fail(function(error) {
  displayError(error)
});
}

function showCommits(el){
let dataset = el.dataset
const datarep = dataset.repository
const name = dataset.owner
$.get(`https://api.github.com/repos/${name}/${datarep}/commits`,function(response){
  console.log("r",response)
  const list = response.map(r=>{
    return `<li> user: ${r.author.login},
    name: ${r.commit.author.name},
    sha: ${r.sha},
    image: <img src="${r.avatar_url}">
    message: ${r.commit.message}</li>`
})
let repoList = `<ul> ${list}</ul>`
document.getElementById("details").innerHTML = repoList
})
}


function displayError(error){

errormsg = ("I'm sorry, there's been an error. Please try again.");
document.getElementById("errors").innerHTML = errormsg
}



$(document).ready(function (){
// create search rep on click
// takes value of searchTerms text input
// queries the GitHub rep search API
});
