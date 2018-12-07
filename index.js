$(document).ready(function (){
});

function displayError() {
  $('#errors').html("Sorry, there was an error!")
}

function searchRepositories() {
  const searchTerms = $('#searchTerms').val();
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`)
    .done(displayRepositories)
    .fail(displayError);
}

function displayRepositories(data){
  const resultList = `<ul>${data.items.map(result =>
    '<li>' + '<a href="' + result.html_url + '">' + result.name + '</a>' + result.description + '<br>' +
    'Owner:<br>' + '<a href="'+result.owner.html_url+'">' + result.owner.login + '</a><br>' +
    '<img src="' + result.owner.avatar_url + '" style="width=20px; height:20px;"/>'+
    '<a href="#" data-url="' + result.commits_url + '" onclick="showCommits(this);">Show Commits</a>' + '</li>'
  ).join('')}</ul>`;
  $("#results").html(resultList);
}

function showCommits(element){
  $.get(`https://api.github.com/repos/${element.dataset.owner}/${element.dataset.repository}/commits`)
    .done(displayCommits)
    .fail(displayError);
}

function displayCommits(data){
  const commitList = `<ul>${data.map(commit =>
    '<li>' + commit.committer.login + '<br>' +
    commit.commit.author.name + '<br>' +
    commit.sha + '<br>' +
    '<img src="' + commit.committer.avatar_url + '" style="width=20px; height:20px;"/>' + '<br>' +
    commit.commit.message + '<hr></li>'
  ).join('')}</ul>`;
  $('#details').html(commitList);
}
