function showCommits (linkContainingRepoInfo) {
  const repoName = linkContainingRepoInfo.dataset.repository;
  const owner = linkContainingRepoInfo.dataset.owner;
  const url = `https://api.github.com/repos/${owner}/${repoName}/commits`
  $.get(url, function (data) {
    const templateSrcCode = document.getElementById("commits-template").innerHTML;
    const templateFn = Handlebars.compile(templateSrcCode);
    const commitsList = templateFn(data);
    $("#details").html(commitsList);
  }).fail(displayError)
}

function displayError (error) {
  $("#errors").html(`<p>I'm sorry, there's been an error. Please try again.</p>`);
}

function searchRepositories () {
  const searchTerm = $("#searchTerms").val();
  const url = `https://api.github.com/search/repositories?q=${searchTerm}`;
  $.get(url, function (data) {
    const templateSrcCode = document.getElementById("repository-template").innerHTML;
    const templateFn = Handlebars.compile(templateSrcCode);
    const repoList = templateFn(data.items);
    $("#results").html(repoList);
  }).fail(displayError)
}

$(document).ready(function (){
});
