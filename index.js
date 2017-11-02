$(document).ready(function (){
});

function searchRepositories() {
  const input = $("#searchTerms")[0].value;
  $.get(`https://api.github.com/search/repositories?q=${input}`, data => {
    $("#results").html(showRepositories(data))
  }).fail(error => {
    displayError()
  })
}

function showRepositories(repos) {
  const repoList = '<ul>' + repos.items.map(r => {
   return (`
    <li>
      <h2><a href="${r.html_url}">${r.name}</a></h2>
      <p>Watchers: ${r.watchers_count}</p>
      <p>Forks: ${r.forks_count}</p>
      <p>Issues: ${r.open_issues_count}</p>
    </li>`
    )
  }).join('') + "</ul>"
  document.getElementById("results").innerHTML = repoList
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

function displayError() {
  $("#errors").html("error, try again")
}
