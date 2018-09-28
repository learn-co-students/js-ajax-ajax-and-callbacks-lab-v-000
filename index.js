$(document).ready(function() {});

function displayError(error) {
  let errorsContainer = document.querySelector("#errors");
  errorsContainer.innerHTML = `<p>I'm sorry, there's been an error. Please try again.</p>`;
}

function searchRepositories() {
  const searchTerms = $("#searchTerms").val();
  $.get("https://api.github.com/search/repositories?q=" + searchTerms, function(
    data
  ) {
    addToResults(data);
  }).fail(displayError);
}

// name, description, html_url, owner login, owner avatar, owner url
function addToResults(data) {
  let resultsContainer = document.querySelector("#results");
  let itemsArray = data["items"];

  for (const item of itemsArray) {
    resultsContainer.innerHTML += `<div class="repository-card">
    <h1 class="repository-name">${item["name"]}</h1>
    <p class="repository-description">
      ${item["description"]}
    </p>
    <a href="${item["html_url"]}">html_url</a>
    <p class="owner-login">
      ${item["owner"]["login"]}
    </p>
    <img src="${item["owner"]["avatar_url"]}" />
    <a href="${item["owner"]["url"]}">owner's profile page</a>
    <p><a href="#" data-repository="${item["name"]}" data-owner="${
      item["owner"]["login"]
    }" onclick="showCommits(this)">Show Commits</a></p>`;
  }
}

function showCommits(el) {
  $.get(
    `https://api.github.com/repos/${el.dataset.owner}/${
      el.dataset.repository
    }/commits`,
    function(data) {
      renderCommits(data);
    }
  ).fail(displayError);
}

// SHA, author, author's login, author's avatar as img
function renderCommits(data) {
  console.log(data);
  let detailsContainer = document.querySelector("#details");
  let detailsArray = data;

  for (const item of detailsArray) {
    detailsContainer.innerHTML += `<p>${item["sha"]}</p>
    <p>${item["author"]["login"]}</p>
    <img src="${item["author"]["avatar_url"]}" />`;
  }
}
