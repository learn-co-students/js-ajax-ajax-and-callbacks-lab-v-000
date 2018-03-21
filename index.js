$(document).ready(function (){

});

function searchRepositories(){
  let username = $('#searchTerms').val()
  let view = '<ul>'
  $.get(`https://api.github.com/search/repositories?q=${username}`, function(response){
    for(let i = 0; i<response.items.length; i++){
      const repname = `<h4>${response.items[i].name}</h4>`
      const description =	`<p>${response.items[i].description}</p>`
      const link = `<a href='${response.items[i].html_url}'>Repository Link</a>`
      const ownerLogin = `<p>${response.items[i].owner.login}</p>`
      const ownerImage =	`<img src='${response.items[i].owner.avatar_url}'><br/>`
      const ownerLink = `<a href='${response.items[i].owner.html_url}'>Profile</a><br/>`
      const showCommitLink = `<a href='#' data-repository='${response.items[i].name}' data-owner='${response.items[i].owner.login}' onclick='showCommits(this)'>Get Commits</a>`
      let currentView = `<li>${repname}${description}${link}${ownerLogin}${ownerImage}${ownerLink}${showCommitLink}</li>`
      view += currentView
    }
    view += '</ul>'
    $('#results').html(view)
  }).fail(displayError)
}

function showCommits(el){
  const name = el.dataset.repository
  const user = el.dataset.owner
  let view = '<ul>'
  $.get(`https://api.github.com/repos/${user}/${name}/commits`, function(response){
    console.log(response)
    for(let i = 0; i<response.length; i++){
      const sha = `<p>${response[i].sha}</p>`
      const author = `<p>${response[i].author.login}</p>`
      const avatarImg = `<img src='${response[i].author.html_url}'>`
      let currentView = `<li>${sha}${author}${avatarImg}</li>`
      view += currentView
    }
    view += '</ul>'
    $('#details').html(view)
  }).fail(displayError)
}

function displayError(error){
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}
