$(document).ready(function (){
});



function searchRepositories(){
    let searchTerms = $("#searchTerms").val();
    let url = `https://api.github.com/search/repositories?q=${searchTerms}`;

    $.get(url, function(results){
        let repoList = results.items.map( repo => {

            return `<ul>
                        <h3>${repo.name}</h3>
                        <li>${repo.description}</li>
                        <img src="${repo.owner.avatar_url}" height="30">
                        <li><a href="${repo.owner.url}">${repo.owner.login}</a></li>
                        <li><a href="#" onclick="showCommits(this);" data-owner="${repo.owner.login}" data-repository="${repo.name}">ShowCommits</a></li>
                     </ul>`
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

            return `<ul>
                        <li>${commit.commit.author.name} - ${commit.author.login}</li>
                        <img src="${commit.author.avatar_url}" height="30">
                        <li>${commit.sha}</li>
                    </ul>`
        })

        $('#details').html(commitList)
        }).fail( error => {
            displayError()
    });
}





function displayError(){
    $('#errors').html("I'm sorry, there's been an error. Please try again.")
}



