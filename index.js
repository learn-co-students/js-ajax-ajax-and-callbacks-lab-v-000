$(document).ready(function (){  
});

function searchRepositories(){
  let terms = $("#searchTerms").val();
  $.get(`https://api.github.com/search/repositories?q=${terms}`, function(response){
    const repoList = "<ul>" + response.items.map(r => {
      const repository = r.name
      const owner = r.owner.login
      return (
        `<li>
          <h2><a href="${r.url}">${repository}</a></h2>
          <p>Description:${r.description}</p>
          <a href="#" data-repository="${repository}" data-owner="${owner}" onclick="showCommits(this);">Show Commits</a>
          <h3>Owner: <a href="${r.owner.url}">${owner}</a></h3>
          <img src="${r.owner.avatar_url}">
        </li>`
      )
    }).join('') + "</ul>";
    document.getElementById("results").innerHTML = repoList
  })
}


//  function searchRepositories(){
//     let terms = $("#searchTerms").val();
//     const req = new XMLHttpRequest()
//     req.addEventListener("load", showRepositories)
//     req.open("GET", `https://api.github.com/search/repositories?q=${terms}`)
//     req.send()
//   }
  
  // function showRepositories(event,data){
  //   let repos = JSON.parse(this.responseText).items
  //   const repoList = "<ul>" + repos.map(r => {
  //     const repository = r.name
  //     const description = r.description
  //     const repoUrl = r.url
  //     const owner = r.owner.login
  //     const ownerAvatar = r.owner.avatar_url
  //     const ownerUrl = r.owner.url
  
  //     return (
  //       `<li>
  //         <h2><a href="${repoUrl}">${repository}</a></h2>
  //         <p>Description:${description}</p>
  //         <a href="#" data-repository="${repository}" data-owner="${owner}" onclick="showCommits(this);">Show Commits</a>
  //         <h3>Owner: <a href="${ownerUrl}">${owner}</a></h3>
  //         <img src="${ownerAvatar}">
  //       </li>`
  //     )
  //   }).join('') + "</ul>";
  //   document.getElementById("results").innerHTML = repoList
  // }
  
  function showCommits(data){
    const repository = data.dataset.repository
    const owner = data.dataset.owner
    const req = new XMLHttpRequest();
    req.addEventListener("load", displayCommits)
    req.open("GET", `https://api.github.com/repos/${owner}/${repository}/commits`)
    req.send();
  }
  
  function displayCommits(event,data){
    const commits = JSON.parse(this.responseText)
    const commitList = "<ul" + commits.map(c =>{
      const commitUrl = c.url
      const commitAuthor = c.committer.name
      const commitAuthorLogin = c.committer.login
      const authorAvatar = c.committer.avatar_url
      return (
        `<li>
        <h2>${commitUrl}</h2>
        <p>SHA: ${c.sha}<p>
        <p>Author: ${commitAuthor}</p>
        <p>Login: ${commitAuthorLogin}</p>
        <img src="${authorAvatar}">
        </li>`
      )
    }).join('') + "</ul>";
    document.getElementById("details").innerHTML = commitList;
  }
  
  function displayError(){
    $('#errors').html("I'm sorry, there's been an error. Please try again;")
  }
