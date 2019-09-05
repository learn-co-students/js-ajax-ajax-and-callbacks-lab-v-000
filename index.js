var displayError = () => $('#errors').html("I'm sorry, there's been an error. Please try again.")

var renderCommit = (commit) => {
  return `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
}

var renderCommits = (data) => {
  let result = data.map((commit)=>renderCommit(commit)).join('')
  return `<ul>${result}</ul>`
}

var showCommits = (el) => {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
    $('#details').html(renderCommits(data))
  }).fail(error => {
    displayError()
  })
}

var renderSearchResult = (result) => {
  return `
      <div>
        <h2><a href="${result.html_url}">${result.name}</a></h2>
        <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
        <p>${result.description}</p>
      </div>
      <hr>
    `
}

var renderSearchResults = (data) => data.items.map( result => renderSearchResult(result))

var searchRepositories = () => {
  const searchTerms = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
      $('#results').html(renderSearchResults(data))
    }).fail(error => {
      displayError()
    })
}

$(document).ready(function (){
});


// function searchRepositories() {
//   const username = $("#searchTerms").val())
//   const url = `https://api.github.com/users/${username}/repos`
//   $.get(url)
//   // const req = new XMLHttpRequest()
//   // req.addEventListener("load", displayRepositories);
//   // req.open("GET", `https://api.github.com/users/${username}/repos`)
//   // req.send()
// }
//
// function displayRepositories(event, data) {
//     const repos = JSON.parse(this.responseText)
//     const repoList = `<ul>${repos.map(r => `<li><a href="${r.html_url}">"${r.html_url}"</a> - <a href="#" data-repository="${r.name}" onclick="getCommits(this)">Get Commits</a> - <a href="#" data-repository="${r.name}" onclick="getBranches(this)">Get Branches</a></li>`).join('')}</ul>`
//
//     // const src = $("#repository-template").innerHTML
//     // const template = Handlebars.compile(src)
//     // const repoList = template(repos)
//     $("#repositories").innerHTML = repoList
//
// }
//
//
// $(document).ready(function (){
// });
