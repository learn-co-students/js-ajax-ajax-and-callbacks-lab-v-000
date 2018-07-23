 /* global $ */


$(document).ready(function (){

});

function searchRepositories() {
    const searchTerm = document.getElementById('searchTerms').value;
    console.log('Search Repositories for : ', searchTerm);
    
    const searchUrl = "https://api.github.com/search/repositories?q=" + searchTerm;
    
    // Response
    $.get(searchUrl, function(data) {
        // Successful url reponse
        console.log("Done");
        console.log(data);
        
        const searchResults = '<ul>' + data.items.map(r => {
            return (`
                  <li>
                    <h4>${r.name}</h4>
                    <p>Description: ${r.description}</p>
                    <p><a href="${r.html_url}">Link to Repo</a></p>
                    <p>Owner Login: ${r.owner.login}</p>
                    <p><img src="${r.owner.avatar_url}" height="32" width="32"></p>
                    <p><a href="${r.owner.html_url}">Link to Owner Page</a></p>
                    <p><a href="#" data-repository="${r.name}" data-owner="${r.owner.login}" onclick="showCommits(this);return false;">Show Commits</a></p>
                  </li>`
                  )
            }).join('') + "</ul>";
        
        document.getElementById("results").innerHTML = searchResults;

    }).fail(function(error) {
        // Failed url response
        console.log('Something went wrong: ' + error);
        displayError();
    });

}

function displayError() {
    console.log('Show Errors');
    document.getElementById('errors').innerHTML = "I'm sorry, there's been an error. Please try again.";
}

function showCommits(el) {
    console.log('Show Commits');
    console.log('This = ', el);
    
    const repository = el.dataset.repository;
    const owner = el.dataset.owner;
    const commitsUrl = 'https://api.github.com/repos/' + owner + '/' + repository + '/commits';
    
    // Response
    $.get(commitsUrl, function(commits) {
        // Successful url reponse
        console.log("Show Commits");
        console.log(commits);
        
        const repoCommits = '<ul>' + commits.map(r => {
            return (`
                  <li>
                    <p>SHA: ${r.sha}</p>
                    <p>Author: ${r.commit.author.name}</p>
                    <p>Author's Login: ${r.author.login}</p>
                    <p><img src="${r.author.avatar_url}" height="32" width="32"></p>
                  </li>`
                  )
            }).join('') + "</ul>";
        
        document.getElementById("details").innerHTML = repoCommits;

    }).fail(function(error) {
        // Failed url response
        console.log('Something went wrong: ' + error);
        displayError();
    });

}