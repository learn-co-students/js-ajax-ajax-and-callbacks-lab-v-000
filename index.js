function searchRepositories() {
  const searchTerms = $("#searchTerms").val();

  $.ajax({
    url: `https://api.github.com/search/repositories?q=${searchTerms}`,
    type: "GET"
  })
  .done(renderSearchResults)
  .fail(displayError)
}

function displayError () {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

function renderSearchResults(data) {
  const repos = data.items;
  repos.forEach(function(repo) {
    $("#results").append(
      `<div>
        <h2><a href="${repo.html_url}">${repo.name}</a></h2>
        <p><a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
        <p>${repo.description}</p>
      </div>
      <hr>`
    )
  });
}

function showCommits(e) {
  // FETCH testing
  // fetch(`https://api.github.com/repos/${e.dataset.owner}/${e.dataset.repository}/commits`)
  //   .then(parseJSON)
  //   .then(renderCommits)

  $.ajax({
    url: `https://api.github.com/repos/${e.dataset.owner}/${e.dataset.repository}/commits`,
    type: "GET"
  })
  .done(renderCommits)
  .fail(displayError)
}

function renderCommits(data) {
  data.forEach(function(commit) {
    console.log(commit);
    $("#details").append(
      `<div>
        <p>${commit.author.login}</p>
        <img src="${commit.author.avatar_url}" style="height: 30px; width: 30px;">
        <p>${commit.sha}</p>
      </div>`
    )
  })
}

function parseJSON(response) {
  return response.json();
}

$(document).ready(function (){
});
