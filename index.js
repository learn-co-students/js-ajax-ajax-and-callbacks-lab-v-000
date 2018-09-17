function searchRepositories() {
  var searchTerms = $("#searchTerms")[0].value

  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`,function(response) {
    $("#results").html(displayRepositories(response))
  }).fail(error => displayError())
}

function displayRepositories(response) {
  return response.items.map(result => {
  return `
      <div>
        <h2><a href="${result.html_url}">${result.name}</a></h2>
        <h4>${result.owner.login}</h4>
        <img src="${result.owner.avatar_url}" height="32" width="32">
        <a href="${result.owner.html_url}">Profile Page</a>
        <p>${result.description}</p>
        <p><a href="#" onclick="showCommits(this)" data-repository="${result.name}" data-owner="${result.owner.login}" >Show Commits</a></p>
        </div>
        `
})
}

function displayError() {
  $("#errors").html("I'm sorry, there's been an error. Please try again.")
}

function showCommits(el) {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, function(response) {
    $("#details").html(displayCommits(response))
  }).fail(error => displayError())
}

function displayCommits(response) {
  return response.map(result =>
  `
    <ul>
    <li>
      <h2>${result.commit.author.name} - ${result.author.login}</h2>
      <img src="${result.author.avatar_url}" height="32" width="32">
      <h4>${result.sha}</h4>
    </li>
    </ul>
  `)
}
