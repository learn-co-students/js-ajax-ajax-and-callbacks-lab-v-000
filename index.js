$(document).ready(function  (){

});

function searchRepositories () {
  $.get(`https://api.github.com/search/repositories?q=${document.getElementById('searchTerms').value}`, function(data) {

    for (const x of data.items) {

      $('#results').append(`<div>${x.name}, <a href="#" data-repository="${x.name}" data-owner="${x.owner.login}" onclick="showCommits(this)">Show Commits</a></div>`)
    }
  })
}

function showCommits(el) {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, function(data){
    console.log(data)
  for (const x of data)
    $('#details').append(`<div>SHA:${x.sha},NAME:${x.commit.author.name}, login: ${x.author.login} <img src="${x.author.avatar_url}"></div>`)
  }).fail(displayError)

}

function displayError () {
    $('#errors').append("I'm sorry, there's been an error. Please try again.")
}
