$(document).ready(function (){

})

function searchRepositories() {
  let formatRepo = (repo) => {
    return `
      <div>
        <h3><a href="${repo.html_url}"> ${repo.name} </a></h3>
          <p>${repo.description}</p>
          <h4>${repo.owner.login}</h4>
          <h5><a href="${repo.owner.html_url}">${repo.owner.html_url}</a></h5>
          <img src="${repo.owner.avatar_url}" height="80px"><br></li>
      </div>
      <hr>
      `
  }

  let formatResults = (data) => data.items.map(repo => formatRepo(repo))

  let searchTerms = $("#searchTerms").val()
  let url = "https://api.github.com" + "/search/repositories" + `?q=${searchTerms}`

  $.get(url, function(data) {
    $('#results').html(formatResults(data))
  })
}
