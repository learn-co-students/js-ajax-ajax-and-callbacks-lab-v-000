$(document).ready(function() {});

function searchRepositories() {
  const search = document.getElementById("searchTerms").value;
  let URI = `https://api.github.com/search/repositories?q=${search}`;
  $.get(URI, function(response) {
    let data = response.items
      .map(
        r =>
          `<h4><a href="${r.html_url}">${r.name}</a></h4>
          <li>${r.description}</li>
          <img src="${r.owner.avatar_url}" width="75" height="75">
          <p>Owner: <a href="${r.owner.html_url}">${r.owner.login}</a></p>
          <a href="#" data-repository=${r.name} data-owner=${r.owner.login}
          onclick="showCommits(this)">Show Commits</a>`
      )
      .join("");
    $("#results").html(data);
  }).fail(displayError());
}

function showCommits(el) {
  const repo = el.dataset.repository;
  const owner = el.dataset.owner;
  let URI = `https://api.github.com/repos/${owner}/${repo}/commits`;
  $.get(URI, function(response) {
    let data = response
      .map(
        r =>
          `<li>SHA: ${r.sha}</li>
          <li>Author: ${r.commit.author.name}</li>`
      )
      .join("");
    $("#details").html(data);
  }).fail(displayError());
}

function displayError() {
  $("#errors").html("I'm sorry, there's been an error. Please try again.");
}
