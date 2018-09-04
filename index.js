$(document).ready(function (){
});



function searchRepositories(){
    let searchTerms = $("#searchTerms").val();
    let url = `https://api.github.com/search/repositories?q=${searchTerms}`;

    $.get(url, function(results){
        let repoList = results.items.map( repo => {

            return `<h3>${repo.name} ${repo.owner.login}</h3>
            <img src="${repo.owner.avatar_url}" height="30">
            <p><a href="${repo.owner.url}">Owner page</a><p>
            <p>${repo.description}</p>
            <p><a href="${repo.html_url}">Repo Link</a></p>
            <p><a href="#" onclick="showCommits(this);" data-owner="${repo.owner.login}" data-repository="${repo.name}">ShowCommits</a></p>`
        })

          $('#results').html(repoList)
        }).fail( error => {
            displayError()
    });
};





function showCommits(el){
    let owner = el.dataset.owner 
    let repo = el.dataset.repository
    let url = `https://api.github.com/repos/${owner}/${repo}/commits`

    $.get(url, function(results){
        let commitList = results.map( commit => {
            
            return `<h3>${commit.sha}</h3
                    <p>${commit.commit.author.name}</p>
                    <p>${commit.author.login}</p>
                    <img src="${commit.author.avatar_url}" height="30">`
        })

        $('#details').html(commitList)
        }).fail( error => {
            displayError()
    });
}





function displayError(){
    $('#errors').html("I'm sorry, there's been an error. Please try again.")
}



 // Include repository name, description, and a link to the HTML 
 // Also include repository owner login, repository owner avatar as an image, and a link to the owner's profile page

// GET /repos/:owner/:repo/commits
 // For each commit, list the SHA, the author, the author's login, and the author's avatar as an image.


