  function searchRepositories() {
    $(document).ready(function(){

    const repo = $('#searchTerms').val()

// "sentence.html", function(response) {
    // Here we are getting the element on the page with the id of sentences and
    // inserting the response
//    $("#sentences").html(response);
    let url = 'https://api.github.com/search/repositories?q=' +  repo
    $.get(url).done(function(data) {
      //$.each(data.items, function (idx, obj) {
      //  console.log(obj);
      const repos = data.items

      //Handlebars template to insert data
      const src = document.getElementById("repository-template").innerHTML
      const template = Handlebars.compile(src)
      const repoList = template(repos)

      $("#results").html(repoList)
    }).fail(displayError)
    })
}


function showCommits(el) {
  const repo = el.dataset.repo
  const owner = el.dataset.username
  const url = `https://api.github.com/repos/${owner}/${repo}/commits`

    $.get(url, function (data) {
      const commits = data
      const src = document.getElementById("commits-template").innerHTML
      const template = Handlebars.compile(src)
      const commitList = template(commits)

      $("#details").html(commitList)
    })
}

function displayError() {
  $("#errors").html("I'm sorry, there's been an error. Please try again.")
}
