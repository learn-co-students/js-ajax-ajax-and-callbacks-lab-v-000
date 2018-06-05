$(document).ready(function (){

});

function searchRepositories(){
  const username = $("#searchTerms").val()
  const url = `https://api.github.com/users/${username}/repos`

  $.get(url)
    .done(function(data){
      showRepositories(data)
    })
}//searchRepositories

function showRepositories(data){
  data.forEach(function(repo){
    $('#results').append(`
      <h4 class="name">${repo.name}</h4>
      Created By ${repo.owner.login}</h4></header>
      <img src="${repo.owner.avatar_url}" height="32" width="32">
      <ul>
        <li><a href="${repo.html_url}">URL</a></li>
        <li><p>Description: ${repo.description}</li>
        <li><a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}" onclick="showCommits(this)">Get commits</a>
        <div id="commits"></div>
      </ul>
    `)
  })//forEach
}

function showCommits(repo){
  $('#details').html(``)
  $.get(`https://api.github.com/repos/${repo.dataset.owner}/${repo.dataset.repository}/commits`).done(function(data){
  data.forEach(function(commit){
    $('#details').append(`
      <li>SHA: ${commit.sha}</li>
      <li>Author: ${commit.commit.author.name}</li>
      <li>Login: ${commit.author.login}</li>
      <img src="${commit.author.avatar_url}" height="32" width="32">
      <li>Description: ${commit.commit.message}</li>
    `)
    })
  })
}
