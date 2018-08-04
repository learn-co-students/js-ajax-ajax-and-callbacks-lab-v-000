function displayError(){
  $('#errors').html(`<p>Oops... there's been an error...</p>`)
}

// function searchRepositories(){
//   search = $("#searchTerms")[0].value
//   $.get(`https://api.github.com/search/repositories?q=${search}`, function(data){
//     console.log("Yeah it worked!")
//     $('#results').html("searching")
//     showRepositories(data)
//   }).fail(function(error){
//     console.log("Erruurrrr")
//     displayError()
//     $('#results').html("erroring")
//   })
// }

function searchRepositories() {
  const searchTerms = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(data) {
      $('#results').html(showRepositories(data))
    }).fail(error => {
      displayError()
    })
}

function showRepositories(results){
  $('#results').html(results.items.map(repo => displayRepository(repo)))
}

function displayRepository(repo){
  return `<div>
            <h2> <a href=${repo.html_url}>${repo.name}</a></h2>
            <p> <img src=${repo.owner.avatar_url} width=30px height=30px> ${repo.owner.login} <p>
            <p> <a href="#" data-commits_url="${repo.commits_url}" onclick="showCommits(this)"> See commits </a></p>
          </div>`
}

function showCommits(link){
  $.get(link.dataset.commits_url), data => {
    $('details').html(`here they are, the commits`)
  }
}

$(document).ready(function (){
});
