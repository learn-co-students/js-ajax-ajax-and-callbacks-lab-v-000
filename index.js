function displayError() {
  $("#errors").html("I'm sorry, there's been an error. Please try again.");
}

function showRepository(repo) {
  return `<div>
            <h2><a href="${repo.html_url}">${repo.name}</a></h2>
            <img src="${repo.owner.avatar_url}" height="25px" width="25px" align="left"><h4>${repo.owner.login}</h4>
            <p>${repo.description}</p>
            <a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}" onclick="showCommits(this);">Show Commits</a>
          </div>`
}

function showRepositories(data) {
  return data.items.map(repo => showRepository(repo));
}

function searchRepositories() {
  const searchTerms = $("#searchTerms").val();
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(data) {
    $("#results").html(showRepositories(data));
  }).fail(function(error) {
    displayError();
  });
}

function displayCommit(c) {
  console.log(c)
  return `<div>
              <img src="${c.committer.avatar_url}" height="25px" width="25px" align="left"><h4>${c.commit.author.name}(${c.committer.login})</h4>
            <p>SHA: ${c.sha}</p>
          <div>`
}

function displayCommits(data) {
  return data.map(c => displayCommit(c));
}

function showCommits(el) {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, function(data) {
    $("#details").html(displayCommits(data));
  }).fail(function(error) {
    displayError();
  });
}

$(document).ready(function (){
});
