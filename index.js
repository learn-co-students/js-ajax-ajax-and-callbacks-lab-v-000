$(document).ready(function (){
});

function searchRepositories(){
  let query = $("#searchTerms").val()
  let url = `https://api.github.com/search/repositories?q=${query}`

  $.get(url, function(response){
    const repos = response.items
    reposList = `<ul>${repos.map(r => '<li><h4><a href="' + r.htmlurl + '">' + r.name + '</a></h4><section><header><h4>Created by <a href="' + r.owner.html_url + '">' + r.owner.login + '</a></h4></header><img src="' + r.owner.avatar_url + '" height="32" width="32"></section><p>Description: ' + r.description + '</p><a href="#" data-repository="' + r.name + '" data-owner="' + r.owner.login + '" onclick="showCommits(this)">Commits</a></li>').join('')}</ul>`
    $("#results").html(reposList)
  })
    .fail(displayError)
}

function showCommits(el){
  let repo = el.dataset.repository
  let owner = el.dataset.owner
  let url =  `https://api.github.com/repos/${owner}/${repo}/commits`

  $.get(url, function(response){
    const commits = response
    const commitsList = `<ul>${commits.map(commit => '<li><img src="' + commit.author.avatar_url + '" height="32" width="32"><strong>' + commit.author.login + '</strong> - ' + commit.commit.author.name + ' - ' + commit.commit.message + ' - ' + commit.sha + '</li>').join('')}</ul>`
    $("#details").html(commitsList)
  })
}

function displayError(){
  $("#errors").html("I'm sorry, there's been an error. Please try again.")
}
