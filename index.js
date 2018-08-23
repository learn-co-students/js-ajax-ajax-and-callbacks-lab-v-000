$(document).ready(function (){

  const searchValue = document.getElementById("searchTerms").value
  console.log(searchValue);

  const searchPath = "https://api.github.com/search/repositories?q=" + searhValue



});

function searchRepositories(){
  const searchValue = document.getElementById("searchTerms").value
  //console.log(searchValue);
  //debugger;

  const searchPath = "https://api.github.com/search/repositories?q=" + searchValue

  $.get(searchPath, function(data){
    console.log(data);
    //debugger;
    let repoList = "<ul>"
    for(var i=0;i < data.items.length; i++) {
      repoList += "<li>" + data.items[i].name + ' <a href="#" data-owner="' + data.items[i].owner.login +'" data-repository="' + data.items[i].name + '" onclick="showCommits(this)">Get Commits</a>' + "</li>"
    }
    repoList += "</ul>"
    document.getElementById("results").innerHTML = repoList

  })
}

function displayError(){
  document.getElementById("errors").innerHTML = "I'm sorry, there's been an error. Please try again."
}


function showCommits(el){
  console.log(el);
  //debugger;
  const username = el.dataset.owner
  const name = el.dataset.repository
  //const name =
  const commitPath = 'https://api.github.com/repos/' + username + '/'+ name + '/commits'

  $.get(commitPath, function(data){
    console.log(data);
    //debugger;
    let commitList = "<ul>"
    for(var i=0;i < data.length; i++) {
      commitList += "<li>" + data[i].sha + "</li>"
    }
    commitList += "</ul>"
    console.log(commitList)
    //debugger;
    document.getElementById("details").innerHTML = commitList
  })

  //document.getElementById("details").innerHTML = commitsList

}
