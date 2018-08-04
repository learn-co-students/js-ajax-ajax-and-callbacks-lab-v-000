$(document).ready(function (){
  searchRepositories()

  showCommits()
});

function searchRepositories() {

  const searchTerms = $("#searchTerms").val()
  const uri = `https://api.github.com/search/repositories?q=${searchTerms}`
  $.get(uri, function(data) {
    $("#results").html(data.items.map(item => {
      return `<h2><a href="${item.html_url}"></a> - <a href="#" data-repo="${item.name}" onclick="showCommits(this)">Show Commits</a>'</h2>`
    })
    )
  }).fail(displayError())
}

function showCommits(el) {
  const name = el.dataset.repository
  const owner = el.dataset.owner
  const uri = `https://api.github.com/repos/${owner}/${name}/commits/`
  $.get(uri, function(data) {
    $("#details").html(data.map(item => {
      return `<h2><a href="${item.url}"></a></h2>`
    }))
  })
}


function displayError(){
  $("#errors").html(error => {return "I'm sorry, there's been an error. Please try again."})
}
