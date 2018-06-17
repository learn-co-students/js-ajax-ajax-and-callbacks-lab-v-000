$(document).ready(function (){
});
function displayError(){
    $('#errors').html("Sorry, there was an error. Please try again.")
}
function searchRepositories(){
    const searchTerms = $('#searchTerms').val();
    const url = `https://api.github.com/search/repositories?q=${searchTerms}/`
    $.get(url, function(response){
        $("#results").html(showRepositories(response))
    }).fail(error =>{
        displayError()
    })
}

function showRepositories(response){
    const repos = response.items.map(repo => renderRespositories(repo))
    return `<ul>${repos}</ul>`
}

function renderRespositories(repo){
    return `<li><b>Name: </b><spanp>${repo.name}</span><br>
    <b>Description: </b><span>${repo.description}</span><br>
    <b>URL: </b><span>${repo.html_url}</span>
    <p><a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
    </li><br>
    `
}

function showCommits(repo){
    $.get(`https://api.github.com/repos/${repo.dataset.owner}/${repo.dataset.repository}/commits`, data => {
      $('#details').html(renderCommits(data))
    }).fail(error => {
      displayError()
    })
  }

function renderCommits(data){
    const commits = data.map(commit => addHtml(commit))
    return `<ul>${commits}</ul>`
}

function addHtml(commit){
    return `<li><img src=${commit.author.avatar_url} height="50" width="50"><br>
    <b>Author: </b><span>${commit.author.login}</span><br>
    <b>SHA: </b><span>${commit.sha}</span><br>
    <b>URL: </b><span>${commit.html_url}></span></li><br>`
}
