$(document).ready(function (){
  bindClickListeners()
});

function bindClickListeners() {
  $('form').on('submit', function(e) {
    e.preventDefault()
    searchRepositories()
  })
}

function searchRepositories(){
  const searchTerms = $('#searchTerms').val()
  console.log(searchTerms)
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
      displayRepository(data.items)
    }).fail(error => {
      displayError()
    })
}

function displayRepository(results){
  results.forEach(function(result){
    $('#results').append(
      `<h1><a href='${result.html_url}'>${result.name}</a></h1>
      <p>${result.description}</p>`)
  })
}


function displayError(){
  $("#errors").append("I'm sorry, there's been an error. Please try again.")
}

function showCommits(el){
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
    renderCommits(data)
  })
}

function renderCommits(commits){
  commits.forEach(function(commit){
      $('#details').append(
        `<li><h3>${commit.sha}</h3>
        <p>${commit.commit.message}</p></li>`)
  })
}
