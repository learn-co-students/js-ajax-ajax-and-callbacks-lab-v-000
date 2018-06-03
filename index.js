$(document).ready(function (){
});

function searchRepositories() {
  let query = $("#searchTerms")[0].value;

  $.get(`https://api.github.com/search/repositories?q=${query}`, displayRepositories);
}

function displayRepositories(data) {

  let resultsContent = "<ul>";
  for (repository of data.items) {
    let name = repository.name;
    let description = repository.description;
    let url = repository.html_url;

    let formattedRepo = `<li> ${name} - ${description} - <a href="${url}">Link</a>  - <a href="#" data-repository=${name} data-owner=${repository.owner.login} onclick=showCommits(this)>Get Commits</a></li>`;
    resultsContent += formattedRepo;
  }

  resultsContent += '</ul>'
  $("#results").html(resultsContent);
}

function showCommits(element) {
  $.get(`https://api.github.com/repos/${element.dataset.owner}/${element.dataset.repository}/commits`, function(data){

    let detailsContent = "<ul>";

    for (commit of data) {
      let sha = commit.sha;
      let login = commit.author.login;
      let author = commit.commit.author.name;
      let avatar_url = commit.author.avatar_url;

      let formattedCommit = `<li><img src="${avatar_url} height="42" width="42">  ${sha} - ${login} - ${author}</li>`

      detailsContent += formattedCommit
    }

    detailsContent += '</ul>'
    $("#details").html(detailsContent);

  }).fail(displayError);
}

function displayError() {
  $("#errors").html("I'm sorry, there's been an error. Please try again.");
}