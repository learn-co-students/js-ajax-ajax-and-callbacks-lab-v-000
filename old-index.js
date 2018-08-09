$(document).ready(function() {});

function displayError() {
  $("#errors").html("I'm Sorry, There Was An error.");
}

function searchRepositories() {
  const searchTerms = $("#searchTerms").val();
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(
    data
  ) {
    $("#results").html(showRepositories(data));
  }).fail(error => {
    displayError();
  });
}
function showRepositories(results) {
  $("#results").html(results.items.map(repo => displayRepository(repo)));
}
function displayRepository(repo) {
  return `<div>
            <h2> <a href=${repo.html_url}>${repo.name}</a></h2>
            <p> <img src=${repo.owner.avatar_url} width=30px height=30px> ${
    repo.owner.login
  } <p>
            <p> <a href="#" data-commits_url="${
              repo.commits_url
            }" onclick="showCommits(this)"> See commits </a></p>
          </div>`;
}
function showCommits(link) {
  $.get(link.dataset.commits_url),
    data => {
      $("details").html(`here they are, the commits`);
    };
}
