$(document).ready(function (){
 
});

function searchRepositories() {
    let term = $('#searchTerms').val();
    $.get(`https://api.github.com/search/repositories?q=${term}`, function(data){
        showRepositories(data);
    }).fail(displayError());
};

function displayError() {
    $('#errors').html("An error occurred! Please try again!")
};

function showCommits(repo) {
    console.log(repo);  
    let url = repo.dataset.commits.slice(0,-6).toString(); //getting rid of the {/sha}
    $.get(url, function(response){
        console.log(response);
        displayCommits(response);
    }).fail(displayError());
};

function showRepositories(data) {
    $('#results').html(data.items.map(
        i => {return `<div><li>${i.name}</li>
        <p>${i.description}</p>
        <a href='#' data-commits='${i.commits_url}' onclick='showCommits(this)'>Show commits</a></div></br>`})
        );
};

function displayCommits(data) {
    $('#details').html(data.map(
        c => {return `<div><li>${c.sha}</li>
        <p>${c.commit.author.name}</p></div>`})
        );
};