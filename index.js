$(document).ready(function (){
});

function searchRepositories() {
    const searchTerms = $('#searchTerms').val()
    
    $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(data) {
// debugger
    let html = data.items.map(repo => 
        `<div>
            <h3>${repo.name}</h3>
            <p><a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
        </div>`
    )
    
    $("#results").html(html)
  }).fail(function(error){
      return displayError()
  })
}

function displayError() {
    $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

function showCommits(element) {
    $.get(`https://api.github.com/repos/${element.dataset.owner}/${element.dataset.repository}/commits`, function(commits) {
    
    let html = commits.map(commit => 
        `<div>
        <h2>Author: ${commit.author.login}</a></h2>
        <header><h4>${commit.sha}</h4></header>
        <img src="${commit.author.avatar_url}" height="32" width="32">
        </div>`
        )
        $("#details").html(html)
    })
}
