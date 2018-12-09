

function displayError() {
  const error = document.getElementById('errors').value
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

function displayResponse(response) {
  let result = response.items.map(repo => {
  return `
    <li>
    <h3><a href="${repo.html_url}">${repo.name} </a></h3>
     <p><a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}"
     onclick=showCommits(this);return false;"> Show Commits </a></p>
    <p>${repo.description}</p>
    </li>
    `

})
  $('#results').html(result);

}

function showCommits(el) {
   const repoName = el.dataset.repository;
   const owner = el.dataset.owner;
   $.get(`https://api.github.com/repos/${owner}/${repoName}/commits`,
     function(response) {
       $('#details').html(displayCommits(response));
     }).fail(displayError)
   }

function displayCommits(response) {
  console.log(response)
  let commits = response.map(commit => {
    return `
    <li>
    <h3>${commit.commit.author.name}</h3>
    <p>${commit.sha}</p>
    <p>${commit.committer.login}</p>
    <p> ${commit.committer.avatar_url}</p>
    </li>
    `
  })
  $('#details').html(commits)
}

function searchRepositories(){
  let searchTerm = document.getElementById('searchTerms').value
  $.get(`https://api.github.com/search/repositories?q=${searchTerm}`, displayResponse).fail(displayError)
}
