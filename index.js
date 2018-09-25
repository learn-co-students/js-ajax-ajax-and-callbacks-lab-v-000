$(document).ready(function (){



});

// function buildRepoHTML(response){
// }

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
      '</li>').join('')}</ul>`

// include repository owner login, repository owner avatar as an image, and a link to the owner's profile page.
// Hint: Pay close attention to the structure of the search results!

    $('#results').html(repoList);
  })
}

function showCommits() {

}
//
// function displayError(error){
//     let errorHTML = `<p>${error}</p>`
//     $('#errors').html.(errorHTML);
// }
