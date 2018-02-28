function renderSingleResult(r) {
        //   debugger
    return `
        <li>
            <h2>Name: ${r.name}</a></h2>
            <a href="${r.html_url}">HTML URL</a>
            <p>Description: ${r.description}</p>
            <p id="login">Login: ${r.owner.login}</p>
            <img src="${r.owner.avatar_url}">
            <a href="${r.owner.html_url}">Profile page</a><br>
            <a href="#" data-repository="${r.name}"  data-owner="${r.owner.login}" onclick="showCommits(this);">Show Commits</a>
        </li>
        `;
    
}

var renderResults = (data) => data.items.map(r => renderSingleResult(r))


function searchRepositories() {
    var searchTerms = $("#searchTerms").val()
    var url = "https://api.github.com/search/repositories?q=" + searchTerms
    $.get(url, data => {
        // debugger
       $("#results").html(renderResults(data));
    }).fail(function(error) {displayError()});
}

function displayError() {
    return $("#errors").html("I'm sorry, there's been an error. Please try again.")
}

// https://api.github.com/repos/PSNB92/Tetris/commits
function showCommits(r) {
    
    // console.log(dataset.owner)
    var url = "https://api.github.com/repos/" +  r.dataset.owner + "/" + r.dataset.repository + "/commits";
    // debugger
    $.get(url, data => {
        // debugger
       $("#details").html(renderCommits(data));
    }).fail(function(error) {displayError()});
}


var renderCommits = (data) => data.map(r => renderSingleCommit(r))
function renderSingleCommit(r){
    return `
            <li>  
                <p>SHA: ${r.sha}</p>
                <p>Author: ${r.commit.author.name}</p>
                <p>Login: ${r.author.login}</p>
                <img src="${r.author.avatar_url}" />
            </li>
    `;
    
}

$(document).ready(function (){
    
});

