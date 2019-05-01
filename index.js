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
      //const repos = data.items
      //Handlebars template to insert data
      //const src = document.getElementById("repository-template").innerHTML
      //const template = Handlebars.compile(src)
      //const repoList = template(repos)
      //$("#results").html(repoList)
      const resultsHTML = data.items.map (result =>
        `<a href="${result.html_url}">${result.name}</a>
        <p><a href="#" data-username="${result.owner.login}" data-repo="${result.name}" onclick="showCommits(this)">Show Commits</a></p>
        <p>${result.description}</p>`)
      $("#results").html(resultsHTML)
    }).fail(displayError)
    })
}


function showCommits(el) {
  const repo = el.dataset.repo
  const owner = el.dataset.username
  const url = `https://api.github.com/repos/${owner}/${repo}/commits`

    $.get(url, function (data) {
      const commitsHTML = "<ul>" + data.map(commit => `<li> ${commit.commit.author.name} - ${commit.commit.message} - ${commit.sha}</li>`).join('') + "</ul>";
      $("#details").html(commitsHTML)
      //const commits = data
      //const src = document.getElementById("commits-template").innerHTML
      //const template = Handlebars.compile(src)
      //const commitList = template(commits)
      //$("#details").html(commitList)

    })
}

function displayError() {
  $("#errors").html("I'm sorry, there's been an error. Please try again.")
}
