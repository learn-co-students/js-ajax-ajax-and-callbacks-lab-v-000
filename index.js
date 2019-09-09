
// $(document).ready(function (){
//
//
//
// });

function searchRepositories(){

  let searchTerm = document.getElementById("searchTerms").value
  url = `https://api.github.com/search/repositories?q=${searchTerm}`
  //debugger
  $.get(url).done(function(data) {
    const repoList = `<ul>${data.items.map(repo => { return (

      `<li>Repo URL: <a href='${repo.html_url}'> ${repo.html_url}  </a></li><br>
      <li>Owner URL: <a href='${repo.owner.html_url}'>${repo.owner.html_url} </a></li><br>
      <li>Name: ${repo.name}</li><br>
      <li>Owner: ${repo.owner.login}</li><br>
      <li>Description: ${repo.description}</li><br>
      <li>Owner: <a href='${repo.owner.html_url}'>${repo.owner.html_url}</a></li><br>
      <li><img src='${repo.owner.avatar_url}' height="32" width="32">  </li><br>
      <li><a href="#" data-owner="${repo.owner.login}" data-repository="${repo.name}" onclick="showCommits(this)">Show Commits </a></li><br>


      <li> ----------------------</li><br>`)
    })}<ul>`

    document.getElementById("results").innerHTML = repoList
  }).fail(error => {
   displayError()
  })
}

function showCommits(el){

  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`).done(function(data){
      const commitList = `<ul>${data.map(commit => { return (

        `<li>SHA: ${commit.sha}  </li><br>
        <li>Author:${commit.author.login} </li><br>
        <li><img src='${commit.author.avatar_url}' height="32" width="32">  </li><br>

        <li> ----------------------</li><br>`)
      })}<ul>`

      document.getElementById("details").innerHTML = commitList
  debugger
  })


  }


function displayError(){
    $('#errors').html("I'm sorry, there's been an error. Please try again.")
  }
