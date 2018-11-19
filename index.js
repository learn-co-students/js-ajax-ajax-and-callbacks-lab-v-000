
// let renderRepositories = (output) => {
    //     return `
    //         <div>
//             <h1><a href="{output.html_url}">${output.name}</a></h1>
//             <p><a href="#" data-repository="${output.name}" data-owner="${output.owner.login}" onclick="showCommits(this)">
//             <p>${output.description}</p>
//         </div>
//         `
// };


function searchRepositories() {
    const searchTerms = $('#searchTerms').val();
    let url = `https://api.github.com/search/repositories?q=${searchTerms}/`
    $.get(url, function(output) {
        $('#results').html(showRepositories(output))
    }).fail(error => {
        displayError();
    });
};

function showRepositories(output) {
    const repos = output.items.map(repo => renderRepositories(repo))
    return `<ul>${repos}</ul>`
};

function renderRepositories(repo) {
    return `
        <h2>Name: ${repo.name}</h2>
        <p><b>Description: </b>${repo.description}</p>
        <p><b>URL: </b>${repo.html_url}
        <p><a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
        `
};

function showCommits(repo) {
    $.get(`https://api.github.com/repos/${repo.dataset.owner}/${repo.dataset.repository}/commits`, data => {
        $('#details').html(renderCommits(data))
    }).fail(error => {
        displayError()
    });
};

function renderCommits(data) {
    let result = data.map(commit => renderCommit(commit)).join('')
    return `<ul>${result}</ul>`
};

function renderCommit(commit) {
    return `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
};

function displayError() {
    $('#errors').html("I'm sorry, there's been an error. Please try again.");
};

$(document).ready(function (){
});
