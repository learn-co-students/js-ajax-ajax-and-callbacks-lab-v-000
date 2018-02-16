$(document).ready(function (){
});

function searchRepositories(){
  let searchTerm = document.getElementById("searchTerms").value
  let url = `https://api.github.com/search/repositories?q=${searchTerm}`

  $.get(url, function(results){
    let repoList = results.items.map((repo) => {
      return `<h3>${repo.name}</h3>
      <p>Repo url: <a href="${repo.html_url}">Go to Repo</a></p>
      <p>Repo Owner:${repo.owner.login}</p>
      <p>Owner Avatar<img src="${repo.owner.avatar_url}" alt="avatar pic"></p>
      <p><a href"${repo.owner.url}">${repo.owner.login} Profile</a></p>
      <p><a href"#" data-repository="${repo.name}" data-owner="${repo.owner.login}"onclick="showCommits(this)">Show Commits</a></p>
      `})
      document.getElementById("results").innerHTML = repoList
  }).fail(error => {
   displayError()
  })
}

function showCommits(r){
  $.get(`https://api.github.com/repos/${r.dataset.owner}/${r.dataset.repository}/commits`).done(function(data) {
    let commitList = data.map(el => {
      return (`<p>Sha:${el.sha} </p>
      <p>Author's login:${el.author.login}</p>
      <p>Author's Avatar<img src="${el.author.avatar_url}"></p>
      `)}
    )
    document.getElementById("details").innerHTML = commitList
  })
}

function displayError(){
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}
