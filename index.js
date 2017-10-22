$(document).ready(function (){
});

function searchRepositories() {
  const searchTerm = $("#searchTerms")[0].value;
  $.get(`https://api.github.com/search/repositories?q=${searchTerm}`, data => {
    $("#results").html(showRepositories(data))
  }).fail(error => {
    displayError()
  })
}

function showRepositories(data){
  const repositories = '<ul>' + data.items.map(r => {
    return (`
      <li>
        <h2><a href="${r.html_url}">${r.name}</a></h2>
        <p><a href="#" data-repository="${r.name}" data-owner="${r.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
        <p>Watchers: ${r.watchers_count}</p>
        <p>Forks: ${r.forks_count}</p>
        <p>Issues: ${r.open_issues_count}</p>
      </li>
      `)
  }).join('') + "</ul>"
  document.getElementById("results").innerHTML = repositories;
}

function showCommits(el) {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
    $("#details").html(displayCommits(data))
  }).fail(error => {
    displayError();
  })
}

function displayCommits(data) {
  const result = data.map((r) => {
    return `<ul><li>
      <h3>${r.sha}</h3><p>${r.commit.message}</p>
      </li></ul>`
  }).join('')
  return result;
}

function displayError(){
  $("#errors").html("There has been error. Please try again.")
}
