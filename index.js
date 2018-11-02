$(document).ready(function (){
});

function displayError(){
  let error = `<div><strong>"I'm sorry, there's been an error. Please try again."</strong></div>`
  $(`#errors`).html(error)
}


function searchRepositories(){
  const searchTerms = $(`#searchTerms`).val();
  const url = `https://api.github.com/search/repositories?q=${searchTerms}`
  $.get(url, function(response){
    let repos = response.items
    let lis = repos.map(repo =>
      `<li>
        ${repo.name} - ${repo.description}</br>
        <a href="${repo.html_url}>Repo Link</a>"</br>
        <img src="${repo.owner.avatar_url} height="32" width="32">|
        <a href="${repo.owner.html_url}">${repo.owner.login}</a></br>
        <a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}" onclick="showCommits(this)">Show Commits</a>
        <br></br>
      </li>`).join('')

      let repoList = `<ul> ${lis} </ul>`
      $(`#results`).html(repoList);
    }).fail(function(error){
      displayError()
    })
};

function showCommits(el){
  const owner = el.dataset.owner
  const repo = el.dataset.repository
  const url = `https://api.github.com/repos/${owner}/${repo}/commits`
  $.get(url, function(commits){
    let lis = commits.map(commit =>
      `<li>
      ${commit.sha} - ${commit.commit.author.name} - ${commit.author.login}</br>
      <img src="${commit.author.avatar_url} height="32" width="32"">
      </li>`).join('')

  let commitList = `<ul> ${lis} </ul>`
  $(`#details`).html(commitList)
})

};
