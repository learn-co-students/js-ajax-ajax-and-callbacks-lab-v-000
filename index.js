function displayError(){
  return $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

function listCommits(results){
  return results.map (commit =>{
		return `<ul><li> ${commit.sha}</li><li> ${commit.commit.message} </li></ul>`})
}

function showRepositories(results) {
  return results.items.map (repo =>{
    return `<div><h4><a href="test">${repo.name}</a><h4><p><a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}" onclick = "showCommits(this)"> Show Commits</a></p><p>${repo.description}</p></div>`})
}

function searchRepositories(){
  const searchTerms = $('#searchTerms').val()
  let url = `https://api.github.com/search/repositories?q=${searchTerms}`
  $.get(url, results =>{$("#results").html(showRepositories(results))}).fail(error => {displayError()})
}

function showCommits(commit){
  var url = `https://api.github.com/repos/${commit.dataset.owner}/${commit.dataset.repository}/commits`
  $.get(url, results =>{$("#details").html(listCommits(results))}).fail(error => {displayError()})
}

$(document).ready(function (){
});
