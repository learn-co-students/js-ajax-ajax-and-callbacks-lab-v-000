$(document).ready(function (){
});

function searchRepositories() {
  const terms = document.getElementById("searchTerms").value
  $.get(`https://api.github.com/search/repositories?q=${terms}`, function(response) {
    $("#results").html(response.items.map(r =>
      `<img src="${r.owner.avatar_url}" height="32" width="32">
      <h3><a href="${r.html_url}">${r.name}</a></h3>
      <p>${r.description}</p>
      <a href="#" data-repository="${r.name}" data-owner="${r.owner.login}" onclick="showCommits(this);return false;">Show Commits</a><br><br>`
    ));
  }).fail(displayError())
}

function showCommits(repo) {
  $.get(`https://api.github.com/repos/${repo.dataset.owner}/${repo.dataset.repository}/commits`, function(response) {
    console.log(response)
    $("#details").html(response.map(r =>
      `<p>SHA: ${r.sha}</p>
      <p>${r.commit.author.name} @${r.author.login}</p>
      <img src="${r.author.avatar_url}" height="32" width="32">`
    ))
  }).fail(displayError())
}

function displayError() {
  $("#errors").html(`<p style="color:red">I'm sorry, there's been an error. Please try again.</p>`)
}
