$(document).ready(function (){
  $('#link').click(function(){
    searchRepositories();
  })
});

function searchRepositories() {
  let searchTerms = document.getElementById("searchTerms").value
  let URI = 'https://api.github.com/search/repositories?q=' + searchTerms;

  $.get(URI, function(response){
    let info = response.items.map(r => 
      `<h3>Repo: <a href="${r.html_url}">${r.name}</a></h3>
      <img src="${r.owner.avatar_url}" width="100" height="60"/>
      <li>Owner: ${r.owner.login}</li>
      <li><a href="${r.owner.html_url}">Profile</a></li>
      <li>Description: ${r.description}</li>
      <li><a href="#" data-owner=${r.owner.login} data-repository=${r.name} onclick="showCommits(this)">show commits</a><br>`
    ).join(' ')
    $('#results').html(info)
  }).fail(function(){
    displayError();
  })
}

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

function showCommits(el) {
  let URI = "https://api.github.com/repos/" + el.dataset.owner + "/" + el.dataset.repository + "/commits"

  $.get(URI, function(response){
    console.log(response)
    let info = response.map(r => `
    <li>SHA: ${r.sha}</li>
    <li>Author: ${r.commit.author.name}</li>
    <li>Login: ${r.committer.login}</li><br>`).join(' ')

    $('#details').html(info)
  }).fail(function(){
    displayError();
  })
}