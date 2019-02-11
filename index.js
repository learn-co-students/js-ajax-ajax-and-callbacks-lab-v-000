function displayError(){
    $('#errors').html("Im sorry, there's been an error.Please try again.")
}

function searchRepositories(){
    let searchTerms = $('#searchTerms').val();
    $.get(`https://api.github.com/search/repositories?q=${searchTerms}/`, function(response){
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
    return `<li>Name: <spanp>${repo.name}</span><br>
    Description: <span>${repo.description}</span><br>
    URL: <span>${repo.html_url}</span>
    <p><a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
    </li><br>`
}

function showCommits(repo){
    $.get(`https://api.github.com/repos/${repo.dataset.owner}/${repo.dataset.repository}/commits`, data => {
      $('#details').html(renderCommits(data))
    }).fail(error => {
      displayError()
    })
  }

function renderCommits(data){
    let commits = data.map(commit => addHtml(commit))
    return `<ul>${commits}</ul>`
}

function addHtml(commit){
    return `<li><img src=${commit.author.avatar_url} height="50" width="50"><br>
    Author: <span>${commit.author.login}</span><br>
    SHA: <span>${commit.sha}</span><br>
    URL: <span>${commit.html_url}></span></li><br>`
}
$(document).ready(function (){
});
