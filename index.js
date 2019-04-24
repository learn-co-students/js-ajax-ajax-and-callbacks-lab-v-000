// Register a partial with Handlebars when the page loads
document.addEventListener("DOMContentLoaded", function(event) {
  Handlebars.registerPartial("authorPartial", document.getElementById("author-partial-template").innerHTML)
});

function searchRepositories() {
  const searchTerms = $('#searchTerms').val()
  $(document).ready(function (){

    $("#results").empty()
    $("#details").empty()
    $("#errors").empty()

    $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(data) {

      if (data.total_count == 0) {
        // This is called when the file request succeeds but no data returned
        return displayError("no data found")
      }

      // This is executed when the file request succeeds with data
      const src = document.getElementById("repository-template").innerHTML
      const template = Handlebars.compile(src)
      const repoList = template(data.items)
      $("#results").append(repoList)

    }).fail(function() {
      // This is called when an error occurs
      displayError("repos")
    });
  });
}

function showCommits(userName, repo) {
  const details = "Commits"
  $(document).ready(function (){

    $("#details").empty()
    $("#errors").empty()

    $.get(`https://api.github.com/repos/${userName}/${repo}/commits`, function(data) {

      // This is executed when the file request succeeds
      const src = document.getElementById("commits-template").innerHTML
      const template = Handlebars.compile(src)
      const commitList = template(data)
      $("#details").append(details + " for Repository: " + repo + commitList)

    }).fail(function() {
      // This is called when an error occurs
      displayError("commits")
    });
  });
}

function displayError(param) {

  var errorMessage = "I'm sorry, there's been an error. Please try again."
  if (param == "commits") {
      errorMessage = "I'm sorry, there's been an error. Please refresh the page and try again."
  } else if (param == "no data found") {
      errorMessage = "I'm sorry, there's no data for that search. Please try again."
  }

  $("#errors").append(errorMessage);

}
