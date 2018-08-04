function displayError(){
  $('#errors').html(`<p>Oops... there's been an error...</p>`)
}

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
            <p> <a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}" onclick="showCommits(this)"> See commits </a></p>
          </div>`
}

function showCommits(link){
  let url = `https://api.github.com/repos/${link.dataset.owner}/${link.dataset.repository}/commits/`
  console.log(url)
  $.get(url, data => {
    $('#details').html(iterateOverCommits(data))
  }).fail(error => {
    displayError()
  })
}

function iterateOverCommits(commits) {
  $('#details').html(commits.map(c => displayCommit(c)))
}

function displayCommit(c) {
  return `<div>
            <p><img src=${c.author.avatar_url} width=30px height=30px> <strong>${c.commit.author.name}</strong></p>
            <p>${c.author.login} // ${c.sha}</p>
          </div>`
}

$(document).ready(function (){
});
