function displayError() {
    $('#errors').html(`I'm sorry, there's been an error. Please try again.`);
}
function searchRepositories() {
    const searchTerm = document.getElementById("searchTerms").value;
    const url = `https://api.github.com/search/repositories?q=${searchTerm}`;
    $.get(url, function(response) {
        $('#results').html(renderSearchResults(response))
    }).fail(displayError);
}

function renderSearchResults(response) {
        const repos = response.items;
        const repoList = "<ul>" + repos.map(r => {
            return (`
            <li>
                <h2><a href="${r.html_url}">${r.name}</a></h2>
                <p>${r.owner.login}</p>
                <img src="${r.owner.avatar_url}" height="32" width="32">
                <p>${r.description}</p>
                <p><a href="#" data-repository="${r.name}" data-owner="${r.owner.login}" onclick="showCommits(this); return false;">Show Commits</a></p>
            </li> `)
        }).join('') + "</ul>";
        return repoList;
    } 

function showCommits(el){
    const repo = el.dataset.repository
    const owner = el.dataset.owner
    $.get(`https://api.github.com/repos/${owner}/${repo}/commits`, function(response) {
        $('#details').html(renderCommits(response))
    }).fail(displayError);
}

function renderCommits(response){
        const commits = response;
        const commitList = "<ul>" + commits.map(c => {
            return (`
            <li>
                <h2>Commits by ${c.commit.author.name}</h2>
                <h4>${c.author.login}</h4>
                <img src="${c.author.avatar_url}" height="32" width="32">
                <p>SHA: ${c.sha}</p>
            </li>`)
        }).join('') + "</ul>";
        return commitList;
}

$(document).ready(function (){  

})
