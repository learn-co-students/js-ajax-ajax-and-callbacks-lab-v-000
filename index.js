$(document).ready(function (){
});

let displayError = () => $('#errors').html("I'm sorry, there's been an error. Please try again.");

let searchRepositories = () => {
    const username = $('#searchTerms').val();
    $.get(`https://api.github.com/search/repositories?q=${username}`, function(response) {
        for (let i = 0; i < response.items.length; i++) {
            let result = response.items[i];
            let addition = `<p>
                <h2>${i + 1}. <a href="${result.html_url}" target="_blank">${result.name}</a></h2>
                <img src="${result.owner.avatar_url}" style="height:40px;width:40px;">
                Author: <a href="${result.owner.html_url}" target="_blank">${result.owner.login}</a><br>
                Description: ${result.description}<br>
                <a href="#" data-owner="${result.owner.login}" data-repository="${result.name}" onclick="showCommits(this)">Show Commits</a>
            </p>`;
            document.getElementById('results').innerHTML += addition;
        }
    }).fail(error => {
        displayError()
    })
}

let renderCommit = (commit) => {
    return `<li><img src="${commit.author.avatar_url}" style="height:40px;width:40px;"><h2>${commit.commit.author.name} (${commit.author.login})<h4>${commit.sha}</h4><p>${commit.commit.message}<p></li>`
}

let renderCommits = (data) => {
    let result = data.map((commit) => renderCommit(commit)).join('')
    return `<ul>${result}</ul>`
}

let showCommits = (el) => {
    $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
        $('#details').html(renderCommits(data))
    }).fail(error => {
        displayError()
    })
}