

/*$(document).ready(function (){
});*/



function searchRepositories(){
  let p = $('#searchTerms').val()
  let url = 'https://api.github.com/search/repositories'
  $.get(`${url}?q=${p}`, response =>{
    console.log(response.items[0])
    $('#results').html(showRepos(response))
  }).fail(error => {
    displayError()
  })
}

function showRepos(response){
  return response.items.map(r=>{
    return showRepo(r)
  })
}

function showRepo(repo){
  console.log(repo.name)
  let description
  if(repo.description === null){
    repo.description = "Sorry, No Description Available At This Time"
  }
  return(`
    <div id= "${repo.name}">
    <a href="${repo.html_url}">${repo.name}</a>
    <p> ${repo.description}</p>
    <p><img src="${repo.owner.avatar_url}" height="50" width="50"></p>
    <p><a href="#" data-repository = "${repo.name}" data-owner = "${repo.owner.login}" onclick="showCommits(this)"> Show Commits</a> </p>
    </div>
    `)
}

function displayError(){
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}


function showCommits(c){
  console.log(c)
  let name = c.dataset.repository
  let owner = c.dataset.owner

  let url = `https://api.github.com/repos/${owner}/${name}/commits`
  $.get(url, response=>{
    $('#details').html(displayCommits(response))
  }).fail(error=>{
    displayError()
  })
}

function displayCommit(commit){
  return(`
    ${console.log(commit[0].sha)}
    <div id="${commit[0].sha}">
    <p>Sha: ${commit[0].sha}</p>


    </div>
    `)
}

function displayCommits(com){
  return com.map( c=>{
    return displayCommit(com)
  })
}
