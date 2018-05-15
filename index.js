$(document).ready(function (){
});

function searchRepositories() {
  const searchTerms = document.getElementById("searchTerms").value
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(response) {
    $("#results").html(response.items.map( result =>
    `<img class="flex-none mr3" src="${result.owner.avatar_url}" height="32" width="32">
    <h3><a href="${result.html_url}">${result.name}</a></h3>

    <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>



    <p>${result.description}</p>
    <a href="${result.owner.html_url}">${result.owner.login}</a><br><br><br>`))
  })
  .fail (function(error) {
    $("errors").html(displayError());
  });
}


function displayError() {
  return $("#errors").html("I'm sorry, there's been an error. Please try again.")
}


function showCommits(el) {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, function(response) {
    $("#details").html(response.map( commit =>
    `<h3>${commit.sha}</h3>
    <p>${commit.commit.message}</p><br><br>`))
  })
  .fail (function(error) {
    displayError();
  });
}
