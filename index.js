
function searchRepositories(){
  const searchTerms = $("#searchTerms").val()
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`,data => {
    $('#results').html(renderResults(data))
  }).fail(error =>{
    displayError()
  })
}

function renderResults(data){
  // debugger
  return data.items.map(rep => '<li>' + rep.name + ` <a href="#" data-owner="${rep.owner.login}" data-repo="${rep.name}" onclick='showCommits(this)'>Show Commits</a>` + '</li>')
}

function displayError(){
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

function showCommits(rep){
  $.get(`https://api.github.com/repos/${rep.dataset.owner}/repo/commits`,data =>{
    $('#details').html(data.map(commit => commit.sha))
  })
}

$(document).ready(function (data){
  $.get("index.html",function(response){

  })
});
