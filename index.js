$(document).ready(function (){
});

function searchRepositories() { 
    const searchTerm = $('#searchTerms')[0].value;
    const searchUrl = "https://api.github.com/search/repositories?q=" + searchTerm;
    
    $.get(searchUrl, function(data) {
        console.log("Done")
        console.log("data")
        const searchResults = '<ul>' + data.items.map(r => {
            return (
`<li><h4>${r.name}</h4><p>Description: ${r.description}</p><p><a href="${r.html_url}">Repo</a></p><p>Owner Login: ${r.owner.login}</p>p><img src="${r.owner.avatar_url}"</p><p><a href="${r.owner.html_url}">Owner</a></p></li>`
                   )
        }).join('') + '</ul>';
        $('#results')[0].innerHTML = searchResults;
    }).fail(function(error) {
        console.log(error)
        displayError();
    })
}

function displayError() { 
    $('#errors')[0].innerHTML = "I'm sorry, there's been an error. Please try again.";
}

function showCommits(el) {
    const repository = el.dataset.repository
    const owner = el.dataset.owner
    const url = 'https://api.github.com/repos/' + owner + '/' + repository + '/commits'
    
    $.get(url, function(data) {
        console.log("Done")
        console.log("data")
        const commits = '<ul>' + data.map(r => {
            return (
`<li><p>SHA: ${r.sha}</p><p>Author: ${r.commit.author.name}</p><p>Author's Login: ${r.author.login}</p><p><img src="${r.author.avatar_url}"</p></li>`
                   )
        }).join('') + '</ul>'
        $("#details")[0].innerHTML = commits; 
    }).fail(function(error) {
        console.log(error)
        displayError();
    })
}