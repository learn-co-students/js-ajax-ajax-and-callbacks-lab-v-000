$(document).ready(function (){
});
function displayError() {
  return $('#errors').html("I'm sorry, there's been an error. Please try again.");
}

function searchRepositories() {
  const searchTerms = document.getElementById('searchTerms').value;
  const url = `https://api.github.com/search/repositories?q=${searchTerms}`

  $.get(url, function(results) {
    const resultsList = `${results.items.map(repo => {
      return (
      `<h4>${repo.name}</h4>
      <p>Description: ${repo.description}</p>
      <p>Link: ${repo.html_url}</p>
      <p>Owner: ${repo.owner.login}</p>
      <img src="${repo.owner.avatar_url}">
      <a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}" onclick="showCommits(this)">Show Commits</a>
      `)
    })}`
    document.getElementById("results").innerHTML = resultsList
    }).fail(function(error) {
      displayError();
  });
}

function showCommits(el) {
  const username = el.dataset.owner
  const repoName = el.dataset.repository
  $.get(`https://api.github.com/repos/${username}/${repoName}/commits`).done(function(data){
    const commitsList = `${data.map(c => {
      return (
        `<h4>Commits by ${c.commit.author.name}</h4>
          <p>${c.author.login}</p>
          <img src="${c.author.avatar_url}" height="36" width="36">
          <p>SHA: ${c.sha}</p>`
      )
  })}`
  document.getElementById("details").innerHTML = commitsList
})
}
