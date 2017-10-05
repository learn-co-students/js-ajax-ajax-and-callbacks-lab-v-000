$(document).ready(function (){
});

function searchRepositories(){
  const search = $("#searchTerms")[0].value
  $.get(`https://api.github.com/search/repositories?q=${search}`, result => {
    $("#results").html(showRepositories(result))
  }).fail(error => {
    displayError()
  })
}

function showRepositories(result){
  let repos = '<ul>' + result.items.map(r => {
    return (`<li>
      <a href="${r.html_url}">${r.name}</a>
      <p>${r.description}${r.owner.url}${r.owner.login}</p>
      <img src="${r.owner.avatar_url}">
      <a href="#" data-repository="${r.name}" data-owner="${r.owner.login}" onclick="showCommits(this)">Show Commits</a>
      </li>`)
  }).join('') + "</ul>"
  return repos
}

function displayError(error){
  $("#errors").html("I'm sorry, there's been an error. Please try again.")
}

function showCommits(element){
  $.get(`https://api.github.com/repos/${element.dataset.owner}/${element.dataset.repository}/commits`, result => {
    $("#details").html(displayCommits(result))
  })
}

function displayCommits(result){
  let commits = '<ul>' + result.map(r => {
    return (`<li>
      <p>${r.sha}${r.commit.message}</p>
      </li>`)
  }).join('') + "</ul>"
  return commits
}
