$(document).ready(function (){

});

function searchRepositories() {
  const searchTerm = $("#searchTerms").val()
  $.get(`https://api.github.com/search/repositories?q=${searchTerm}`, function(response) {
    $("#results").html(showResults(response));
  }).fail(function (){
    displayError();
  })
}

function displayError() {
  $("#errors").html(`<p>I'm sorry, there's been an error. Please try again.</p>`)
}

function showResults(result) {
  return result.items.map(repo => {
    return createLayout(repo)
  })
}

function createLayout(repo) {
  return `
    <ul>
      <h1><strong>Name: </strong>${repo.name}</h1>
      <p><a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
      <li><strong>Description: </strong>${repo.description}</li>
      <li><strong>Repo Link: </strong><a href="${repo.html_url}">${repo.html_url}</a></li>
      <li><strong>Owner: </strong>${repo.owner.login}</li>
      <p><img src="${repo.owner.avatar_url}"><p>
      <li><strong>Owner Profile: </strong><a href="${repo.owner.html_url}">${repo.owner.login}</a></li>
    </ul>
  `
}

function showCommits(el) {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, function(response){
    $('#details').html(renderCommit(response))
  }).fail(function(){
    displayError();
  })
}

function renderCommit(result) {
  console.log(result)
  return result.map(commit => {
    return createCommitLayout(commit)
  }).join('')
}


function createCommitLayout(commit) {
  let string;
  if (commit.author === null ) {
    string =  `<div class="commit-author">Author not available </div>
    <hr>`
  } else {
    console.log('hit it')
    string = `
    <div class="commit"><strong>SHA:</strong> ${commit.sha}</div>
    <div class="commit"><strong>Author:</strong> ${commit.author.login}</div>
    <div class="commit"><strong>Message:</strong> ${commit.commit.message}</div>
    <div class="commit"><img src="${commit.author.avatar_url}"></div>
    <hr>
    `
  }
  return string
}
