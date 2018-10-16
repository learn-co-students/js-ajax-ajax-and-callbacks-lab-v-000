function displayError() {
  //jQuery
  $("#errors").html("I'm sorry, there's been an error. Please try again.");
}
// document.getElementById("errors").innerHTML = "I'm sorry, there's been an error. Please try again.";
// }



function showCommits(el) {
  const repo = el.dataset.repository;
  const user = el.dataset.owner;

  const url = `https://api.github.com/repos/${user}/${repo}/commits`

  $.get(url, function(data){

    const commitResults =
    `<ul>${data.map(repo =>
      '<li>' +
      repo.commit.author.name +
      ', ' + repo.sha +
      '</li>').join('')}
    </ul>`;

    document.getElementById("details").innerHTML = commitResults;
  }).fail(displayError())
}


function searchRepositories() {

  const searchTerms = document.getElementById("searchTerms").value
  const url = `https://api.github.com/search/repositories?q=${searchTerms}`

  $.get(url, function(data){
    const searchResults =
    `<ul>${data.items.map(repo =>
      '<li>' + repo.name +
      ', ' +
      repo.html_url +
      '</li>' +
      `<ahref="#"data-repository="${repo.name}"data-owner="${repo.owner.login}"onclick="showCommits(this)">Show Commits</a>`
    ).join('')}
    </ul>`;

    document.getElementById("results").innerHTML = searchResults;
  }).fail(displayError())
}


$(document).ready(function() {

});
