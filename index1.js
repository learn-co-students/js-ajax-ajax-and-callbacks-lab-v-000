$(document).ready(function() {
})
 
// function renderSearchResult(result){
//   return `
//       <div>
//         <h2><a href="${result.items[0].html_url}">${result.items[0].name}</a></h2>
//         <p><a href="#" data-repository="${result.items[0].name}" data-owner="${result.items[0].owner.login
// }" onclick="showCommits(this)">Show Commits</a></p>
//         <img width="100" height="100" src="${result.items[0].owner.avatar_url }">
//         <p>${result.items[0].description}</p>
//       </div>
//       <hr>
//     `
// }

function searchRepositories(){
  const searchTerms = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
      $('#results').html(searchRepositories2(data))
        // searchRepositories2(data)
    }).fail(error => {
      displayError()
    })
  }

function searchRepositories2(data){
  let user = data.items[0].name
  let url = `https://api.github.com/users/${data.items[0].owner.login}/repos`
  $.get(url)
    .done(function(data){
    let repoHTML = '<ul>'
    for(let i = 0; i < data.length; i++){
      repoHTML +=  repoDetails(data[i])  
    }
    repoHTML += '</ul>' 
    $('#results').html(repoHTML)
  }).fail(() => {
    displayError()
  })
}

function repoDetails(repo){
  let details = `
    <ul>
      <li>Name: ${repo.name} </li>
      <li>Description: ${repo.description} </li>
      <li>URL <a href="${repo.html_url}">repo site</a></li>
      <li>Owner: ${repo.owner.login}</li>
      <li><a href="https://github.com/${repo.owner.login}">Profile</li>
      <p><a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
      <img width="100" height="100" src="${repo.owner.avatar_url}">
      </ul>
    <br><br>
    `
    debugger
  return details
}

function displayError(){
  $("#errors").html("I'm sorry, there's been an error. Please try again.")
}
 
function showCommits(thing){
  let url = `https://api.github.com/repos/${thing.dataset.owner}/${thing.dataset.repository}/commits`  
  $.get(url)
  .done(function(data) {
    let html = '<ul>'
    for(let i = 0; i < data.length; i++){ 
      
      if(!data[i].committer.login){
        console.log(data[i])
      } else { 
          let details = 
          `<ul>
          <li>SHA: ${data[i].sha}</li>
          <li>Author: ${data[i].commit.author.name}</li>
          <li>Author Login: ${data[i].committer.login}</li>
          <img width="100" height="100" src="${data[i].committer.avatar_url}">
          </ul>
          `
        }
        html += details
    
    }
    html += '</ul>'
    $("#details").html(html)
  }).fail(function(error) {
    console.log("I'm sorry, there's been an error. Please try again.")
  })
}
