document.addEventListener("DOMContentLoaded", function(event) {
  Handlebars.registerPartial("authorPartial", document.getElementById("author-partial-template").innerHTML)
});


function searchRepositories() {
    var searchTerms = document.getElementById("searchTerms").value;

    // $(document).ready(function (){
        $.get(`https://api.github.com/search/repositories?q=${searchTerms}`).done(function(responseText) {
    const repos = responseText.items;
    const src = document.getElementById("repository-template").innerHTML;
    const template = Handlebars.compile(src);
    const repoList = template(repos);
    $("#results").html(repoList);
    }).fail(function() {
        displayError();
    })
    // });
};

function displayError() {
    $("#errors").html("I'm sorry, there's been an error. Please try again.")
}

function showCommits(el) {
    // $(document).ready(function () {
        $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, function(responseText) {
          const commits = responseText;
    const src = document.getElementById("commits-template").innerHTML;
    const template = Handlebars.compile(src);
    const commitList = template(commits);
    $("#details").html(commitList);
        }).fail(function() {
            displayError();
        })
    // })
};

