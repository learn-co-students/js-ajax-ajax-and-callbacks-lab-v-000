function displayError() {
  $("#errors").html("I'm sorry, there's been an error. Please try again.");
}

function displayCommit(commit) {
  return `
      <li>
        <h3>${commit.sha}</h3>
        <ul>
          <li>Created by: ${commit.author.login} <img src="${commit.author.avatar_url}" height="32" width="32"></li>
          <li>Commit message: ${commit.commit.message}</li>
        </ul>
      </li>
    `
}

function displayCommits(data) {
  return `<ul>${data.map(function(commit) {
    return displayCommit(commit);
  }).join('')}`;
}

function showCommits(el) {
  const owner = el.dataset.owner;
  const repository = el.dataset.repository;

  $.get(`https://api.github.com/repos/${owner}/${repository}/commits`, function(data) {
    $("#details").html(displayCommits(data));
  }).fail(function (error) {
    displayError();
  })
}

function displayResult(result) {
  return `
    <div>
      <h2><a href="${result.html_url}">${result.name}</a></h2>
      <section>
        <header><h4>Created By <a href="${result.owner.url}">${result.owner.login}</a></h4></header>
        <img src="${result.owner.avatar_url}" height="32" width="32">
      </section>
      <p>${result.description}</p>
      <a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this); return false;">Show Commits</a>
    </div>
  `
}

function displayResults(data) {
  return data.items.map(function (result) {
    return displayResult(result);
  });
}

function searchRepositories() {
  const searchTerms = $("#searchTerms").val();

  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(data) {
    $("#results").html(displayResults(data));
  }).fail(function (error) {
    displayError();
  });
}

$(document).ready(function (){
});
