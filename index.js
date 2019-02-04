// import { create } from "domain";

$(document).ready(function(){

});

 function displayError() {
     $('#errors').html("Im sorry, there's been an error.Please try again.");
 }
function searchRepositories() {
    var data = document.querySelector("#searchTerms").value
    const req = new XMLHttpRequest();
    req.addEventListener('load', showRepos);
    req.open('GET', `https://api.github.com/search/repositories?q=${data}`);
    req.send();

  }

  function showRepos(){
        const repos = JSON.parse(this.responseText).items
    const repoList = repos.map(r => `<li><a href=${r.html_url}>${r.name} </a> <a href="#" onclick="showCommits(this)" data-name=${r.name} data-owner=${r.owner.login}> show commits</p></p></li>`).join('')
    
    // const showRepos = repos.map(r => `<li><a href=${r.html_url}>${r.name}</a></li>`).join('')

    document.getElementById('results').innerHTML = "<ul>" + repoList + "</ul>";
  }


  function showCommits(element) {
    document.getElementById('#repositories')
    
       $.get(`https://api.github.com/repos/${element.dataset.owner}/${element.name}/commits`,data => {
        //    debugger
           const commitsList = `<ul>${data.
        map(
            data => 
             '<li><h3>' + data.commit.author.name + ' (' + data.author.login + ') </h3>' +
            data.sha + "+  +"+'</li>' ).join('') }</ul>`
        });
    }


    //    debugger
// <img src="img_chania.jpg" alt="Flowers in Chania">

    //    display data from the , name, owner
    // // Add a "Show Commits" link to each repository result that will call a showCommits function that gets the repository's commits from the GitHub API and display them in the details div. 
   
    // For each commit, list the SHA, the author, 
    // the author's login, and the author's avatar as an image.
 
// based on line 20
    
    
// avatar_url: "https://avatars0.githubusercontent.com/u/96777?v=4"




