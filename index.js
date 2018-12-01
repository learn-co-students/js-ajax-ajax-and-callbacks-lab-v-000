//load page first
$(document).ready(function (){
});

//display error message in error id
function displayError(){
    $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

//when link is clicked - search by input
function searchRepositories() {
    searchTerms = $('#searchTerms').val(); //grap search terms
    //go to github api and seach per search terms
    const url = `https://api.github.com/search/repositories?q=${searchTerms}`;
    $.get(url).done(function(data) {
        const repos = data.items;
        const repoList = `<ul>${repos.map(repo =>
          `<li>${repo.name} by ${repo.owner.login}:<br> <a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}"
           onclick="showCommits(this)">Show Commits</a></li>`).join('')}</ul>`
        $('#results').html(repoList);
    }).fail(function(error) { //if error display error
        displayError(error);
    });
}
// gives details on each commit
 function showCommits(el) {
    const repoName = el.dataset.repository;
    const owner = el.dataset.owner;
    const url = `https://api.github.com/repos/${owner}/${repoName}/commits`;
     $.get(url).done(function(data) {
        const commits = data;
        const commitsList = `<ul>${commits.map (commit =>
          `<li>${commit.sha}<br>${commit.commit.author.name}</li>`).join('')}</ul>`
        $('#details').html(commitsList);
    })
 }
