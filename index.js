//Use success callback and error callback

$(document).ready(function (){
  //Once page loads we set an event listener
  $('a').click(searchRepositories)
});

function searchRepositories() {
 console.log("In search repositories")
 const searchTerm = $('#searchTerms').val()
      //https://api.github.com/search/repositories?q=tetris
 $.get('https://api.github.com/search/repositories?q=' + searchTerm).done(displayRepository).fail(displayError);

}

function displayRepository(data) {
  console.log("In displayRepository")
  console.log(this)//this is the request
  console.log(data)//data is our JSON object

  const dataString = '<ul>' + data.items.map(eachRepoDisplay).join('') + '</ul>'
  $('#results').html(dataString)
}

function eachRepoDisplay(repo) {
  //have them in an li element
  console.log("in eachRepoDisplay")

  return `<li>${repo.name} -
          ${repo.description} -
          <a href="${repo.html_url}">${repo.html_url}</a> -
          ${repo.owner.login} -
          <p><img src="${repo.owner.avatar_url}" height="32" width="32"> -
          <a href="${repo.owner.url}">${repo.owner.url}</a></li>
          <li><a href="#" data-owner="${repo.owner.login}" data-repository="${repo.name}" onclick="showCommits(this)">Show Commits</a></li>`
          
}

function displayError() {
  console.log("In display error");
  $('#errors').html("<p>I'm sorry, there's been an error. Please try again.</p>");
}

function showCommits(el) {
  console.log("In show commits.");
  console.log(this);

  const owner = el.dataset.owner
  const repo = el.dataset.repository

  $.get('https://api.github.com/repos/' + owner + '/' + repo + '/commits').done(displayCommits).fail(displayError);
}

function displayCommits(data) {
  console.log("In display commits");
  console.log(this);
  console.log(data);

  commitString = 'ul' + data.map(eachCommitDisplay) + '<ul>'

  $('#details').html(commitString);
}

function eachCommitDisplay(commit) {
  console.log('In eachCommitDisplay');

  return `<li>
          ${commit.sha} -
          ${commit.commit.author.name} -
          ${commit.author.login} -
          <p><img src="${commit.author.avatar_url}" height="32" width="32"></p>
          `
}
//<p><img src="${commit.author.avatar_url}" height="32" width="32"></p>
