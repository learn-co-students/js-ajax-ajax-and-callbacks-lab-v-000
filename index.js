function searchRepositories() {
  let searchTerm = $("#searchTerms").val()
  $.get(`https://api.github.com/search/repositories?q=${searchTerm}`)
    .done(function(response) {
        let repos = response.items
        repos.forEach(repo => {
          let repoName = "<p>" + repo.name + '</p>'
          let description = '<p>' + repo.description + '</p>'
          let htmlURL = "<p><a href=' " + repo.html_url + " '>Repo Page</a></p>"
          let ownerName = "<p>" + repo.owner.login + '</p>'
          let ownerPage = "<p><a href=' " + repo.owner.html_url + " '>Owner Page</a></p>"
          let ownerAvatar = "<img src=' " + repo.owner.avatar_url + " '>"
          let commits = "<p><a href='#' data-repository='"+ repo.name + "' data-owner='"+ repo.owner.login + "' onclick='showCommits(this)'>Show Commits</a></p>"
          $("#results").html(repoName + description + htmlURL + ownerName + ownerPage + ownerAvatar + commits)
        })//arrow function
      })
      .fail(displayError())
  }//end of searchRepos

function showCommits(el) {
  const owner = el.dataset.owner
  const repository = el.dataset.repository
  $.get(`https://api.github.com/repos/${owner}/${repository}/commits`)
    .done(function(response){
      response.forEach(commit => {
        const sha = "<p>" + commit.sha + '</p>'
        const authorName = "<p>" + commit.commit.author.name + '</p>'
        $("#details").html(sha + authorName)
      })
      //let commits =
      //SHA, the author, the author's login, and the author's avatar as an image.
    })//done
}//end of showCommits

function displayError() {
  $("#errors").html("<p>I'm sorry, there's been an error. Please try again.</p>")
}//end displayError

$(document).ready(function() {

});//doc ready end
//var functionName =(parameter) => {}
//?q={id}
