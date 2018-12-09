$(document).ready(function (){
});

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}


function searchRepositories() {
const searchTerms = $('#searchTerms').val();
//go to github and search with searchTerms input
const url = `https://api.github.com/search/repositories?q=${searchTerms}`;

//jQuery GET request to get the data passed in from the URL based on the searchTerm
//iterate through the data for each repo
$.get(url).done(function(data){
  const repos = data.items;
  const repoList = `<ul>${repos.map(repo =>
    `<li>Repo Name: ${repo.name} <br>
    Repo Owner: ${repo.owner.login}<br><br>
    Owner Avator: <img src= ${repo.owner.avatar_url} style="width=30px; height:30px;"/> <br><br>
    Description: ${repo.description}<br><br>
    <a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}"
    onclick="showCommits(this)">Show Commits</a></li>`).join('')}</ul>`

    //jQuery Selector for id "results" that inserts the data in repolist into index.html"
    $('#results').html(repoList);})
    
    .fail(error=> {displayError();
});
}


function showCommits(el){
const repoName = el.dataset.repository
const owner = el.dataset.owner
const url = `https://api.github.com/repos/${owner}/${repoName}/commits`;
$.get(url).done(function(data){
  const commits = data;
  const commitsList = `<ul>${commits.map(commit =>
  `<li> SHA:${commit.sha}<br>
  Commit Message: ${commit.commit.message} <br>
  Commit Date: ${commit.commit.committer.date}<br>
  Author: ${commit.commit.author.name}<br>
  Author Login: ${commit.committer.login}</li>`).join('')}</ul>`
    $('#details').html(commitsList);
})

}
