$(document).ready(function (){



});
//My Answer

function searchRepositories() {
  let searchText = document.getElementById('searchTerms').value;
  let regex = /\s/
  let searchConverted = searchText.replace(regex, "+");
  let searchUrl = "https://api.github.com/search/repositories?q=" + searchConverted;
  console.log("search URl", searchUrl )

  $.get(searchUrl, function(response){
    let repos = response.items;
    console.log("repos", repos)
    let repoList = `<ul>${repos.map(r =>
      '<li>' +
      r.name + ' - ' +
      r.description + ' - ' +
      `<a href="${r.html_url}">${r.html_url}</a>` + ' - ' +
      r.owner.login + ' - ' +
      `<img src="${r.owner.avatar_url}">` +
      `<a href="${r.owner.html_url}">${r.owner.html_url}</a>` + ' - ' +
      `<a href="#" data-repository="${r.name}" data-owner="${r.owner.login}" onclick="showCommits(this)">Show Commits</a>` + ' - ' +
      '</li>').join('')}</ul>`;

// include repository owner login, repository owner avatar as an image, and a link to the owner's profile page.
// Hint: Pay close attention to the structure of the search results!

    $('#results').html(repoList);
  }).fail(function(error) {
    console.log("error", error);
    // $('#errors').html(error);
  })
}

function showCommits(element) {
  let ownerRepo = element.dataset.owner + '/' + element.dataset.repository;
  console.log("ownerREpo", ownerRepo)
  let commitURL = "https://api.github.com/repos/" + ownerRepo + "/commits"
  console.log("commiturl", commitURL)
  $.get(commitURL, function(response){
    console.log("show commit reponse", response);
    let commits = response;
    console.log("commits", commits);
    let commitList =
    `<ul>${commits
    .map(
        commit =>
        '<li>' +
        commit.sha + ' - ' +
        // commit.author.login +  ' - ' +
        commit.commit.author.name +
        `<img src="${commit.author.avatar_url}">` +
        '</li>'
    )
    .join('')}</ul>`;

    $('#details').html(commitList);

  })
}

// Flatiron Answer

// var displayError = () => $('#errors').html("I'm sorry, there's been an error. Please try again.")
//
// var renderCommit = (commit) => {
//   return `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
// }
//
// var renderCommits = (data) => {
//   let result = data.map((commit)=>renderCommit(commit)).join('')
//   return `<ul>${result}</ul>`
// }
//
// var showCommits = (el) => {
//   $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
//     $('#details').html(renderCommits(data))
//   }).fail(error => {
//     displayError()
//   })
// }
//
// var renderSearchResult = (result) => {
//   return `
//       <div>
//         <h2><a href="${result.html_url}">${result.name}</a></h2>
//         <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
//         <p>${result.description}</p>
//       </div>
//       <hr>
//     `
// }
//
// var renderSearchResults = (data) => data.items.map( result => renderSearchResult(result))
//
// var searchRepositories = () => {
//   const searchTerms = $('#searchTerms').val()
//   $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
//       $('#results').html(renderSearchResults(data))
//     }).fail(error => {
//       displayError()
//     })
// }
//
// $(document).ready(function (){
// });
