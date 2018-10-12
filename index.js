$(document).ready(function (){
 
});

function searchRepositories() {
    let term = $('#searchTerms').val();
    $.get(`https://api.github.com/search/repositories?q=${term}`, function(data){
        showRepositories(data);
    });
};

function displayError() {
    $('#errors').html("An error occurred! Please try again!")
};

function showCommits(el) {
    // let url = repo.dataset.commits.slice(0,-6).toString(); //getting rid of the {/sha}
    $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, function(response){
        console.log(response);
        displayCommits(response);
    }).fail(displayError());
};

function showRepositories(data) {
    $('#results').html(data.items.map(
        i => {return `<div><li>${i.name}</li>
        <p>${i.description}</p>
        <a href='#' data-repository='${i.name}' data-owner='${i.owner.login}' onclick='showCommits(this)'>Show commits</a></div></br>`})
        );
};

function displayCommits(data) {
    $('#details').html(data.map(
        c => {if (c.author !== null) return `<div><li>${c.sha}</li>
        <p>${c.author.login}</p>
        <p>${c.commit.author.name}</p>
        <img src="${c.author.avatar_url}" width='50'></div>`})
        );  
};