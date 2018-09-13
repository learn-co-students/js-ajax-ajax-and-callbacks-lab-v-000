$(document).ready(function (){
});

function searchRepositories(){
    const searchTerms = $('#searchTerms').val();
    const url = `https://api.github.com/search/repositories?q=${searchTerms}/`
    $.get(url, function(response){
        $("#results").html(showRepositories(response));
        // we pass the response to a new function (the callback), so that we can begin handling the response in another seperate function. 
    }).fail(function(error) {
        displayError();
    });
}


function showRepositories(response){
    const repos = response.items;
    return repos.map(repo => `<span><h2> Name: ${repo.name}</h2><b>Avatar: </b><img src= ${repo.owner.avatar_url} height="80" width="80"> </li><br></span>
             <b>Description:</b> ${repo.description} <br>
             <b>Owner Login: </b>${repo.owner.login} <br>
             <a href="${repo.owner.url}"> Profile </a><br>        
             <a href="${repo.html_url}"> Repo </a> <br></span></hr>
             <a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}" onClick="showCommits(this)"> Show Commits </a>`);
};


function showCommits(el){
    const owner = el.dataset.owner
    const repo = el.dataset.repository
    const url = `https://api.github.com/repos/${owner}/${repo}/commits`
    $.get(url, function(response){
        $("#details").html(displayCommits(response))
    }).fail(function(error) {
        displayError();
    });

}

function displayCommits(response){
    const commits = response;
    debugger;
    return commits.map(com=>
        `<img src=${com.author.avatar_url} </li>
        <ul>
            <li>Sha: ${com.sha}</li>
            <li> Author: ${com.commit.author.name} </li>
            <li> Author's Login: ${com.author.login} </li>
        </ul>`
    );
}

function displayError(){
    // This is called when an error occurs
    //You can test your error callbacks by turning off Wi-Fi or temporarily changing the URL you use in the $.get request.
    $("#errors").html(`I'm sorry, there's been an error. Please try again.`);
}

