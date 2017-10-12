$(document).ready(function (){
});

function displayError() {
  $("#errors").html("I'm sorry, there's been an error. Please try again.")
}

function searchRepositories() {
  const searchTerms = $('#searchTerms').val()
   $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
    $(`#results`).html(showRepositories(data))
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

function showCommits(el){
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data =>{
    $("#details").html(displaycommits(data))
  }).fail(error => {
    displayError()
  })
}

function displaycommits(data){
  const result = data.map((r) =>{
    return `
    <h3>${r.sha}</h3>
    <p>${r.commit.message}</p>
    `
  })
  return result;
}
