$(document).ready(function (){

});

function searchRepositories() {
  const searchTerms = $("#searchTerms")[0].value;
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, response => {
    debugger
    $('#results').html(renderSearchResults(response))
  })
}

function renderSearchResults(response) {
  return response.items.map(item => {
    return `
      <div>
        <h2><a href="${item.html_url}">${item.name}</a></h2>
        <p><a href="#" data-repository="${item.name}" data-owner="${item.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
        <p>${item.description}</p>
      </div>
      <hr>
    `
  })
}
