function searchRepositories(){
    const searchTerms = $("#searchTerms").val();
    $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, (response) => {
        $("#results").html(response.items.map(item => {
            return `
                <h2><a href="${item.html_url}">${item.name}</a></h2>
                <p> 
                    <a href="#" data-owner="${item.owner.login}" data-repository="${item.name}" onclick="showCommits(this)">Show Commits</a><br/>
                    ${item.description}<br/> 
                    <a href="${item.owner.html_url}">${item.owner.login}</a><br/>
                    <img src="${item.owner.avatar_url}" height="30" width="30">
                </p>
            `
        })); // the .html jQuery method can have an array as a param.
    }).fail(displayError());
}

function showCommits(element) {
    //GET /repos/:owner/:repo/commits
    const owner = element.dataset.owner;
    const repository = element.dataset.repository;
    $.get(`https://api.github.com/repos/${owner}/${repository}/commits`, (response) => {
        $("#details").html(response.map(commit =>{
            return `
                <h2>${commit.sha}</h2>
                <p> 
                    ${commit.author.login} <br/>
                    ${commit.commit.message}<br/>
                    <img src="${commit.author.avatar_url}" height="30" width="30">
                </p>
            `
        })); // the .html jQuery method can have an array as a param.
    }).fail(displayError());
}

function displayError() {
    $("#errors").html("I'm sorry, there's been an error. Please try again.");
}
$(document).ready();
