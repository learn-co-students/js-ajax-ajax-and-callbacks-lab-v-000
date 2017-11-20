$(document).ready(function (){
});

function searchRepositories() {
  let query = document.getElementById('searchTerms').value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/search/repositories?q=${query}`)
  req.send()
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  const repoList =
  `<ul>
      ${repos.items.map(r =>
        '<li>'+
          '<a href=https://github.com/'+r.full_name+'>'+r.name+'</a>'+"  "+
          '<a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '"onclick="getCommits(this)">Display Commits</a>'+ "  "+
          '<a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '"onclick="getBranches(this)">Display Branches</a>'+
        '</li>').join('')}
    </ul>`
  document.getElementById("results").innerHTML = repoList
}

function displayError() {
  
}
