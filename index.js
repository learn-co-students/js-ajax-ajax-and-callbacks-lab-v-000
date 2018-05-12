$(document).ready(function (){
});


function searchRepositories() {
  $.get(`https://api.github.com/search/repositories?q=${document.getElementById("searchTerms").value}`, function(data) {
    responseString = "<ul>" + data.items.map(item => `<li>
      <h2>${item.name}</h2>
      <p><strong>Description:</strong>${item.description}</p>
      <a href=${item.html_url}>View on GitHub</a><br>
      <p>Owner: ${item.owner.login} - <a href="${item.owner.html_url}">View Profile</a></p>
      <img src=${item.owner.avatar_url}><br>
      <a href="#" onclick="showCommits(this)" data-repository=${item.name} data-owner=${item.owner.name}>Show Commits</a><br>
    </li>`).join("") + "</ul>"

    $("#results").html(responseString)
  }).fail(function(error) {
    $("errors").html(displayError())
  })
}

function showCommits(repo) {
    $.get(`https://api.github.com/repos/${repo.dataset.owner}/${repo.dataset.repository}/commits`, function(commits) {
  commitsString = "<ul>" + commits.map(c => `<li>
      <p>${c.sha}</p>
      <p>Author: ${c.commit.author.name}</p>
      <p>Author Login: ${c.author.login}</p>
      <img src=${c.author.avatar_url}><br>
    </li>`
    ).join("") + "</ul>";

    $("#details").html(commitsString);
  });
}

function displayError() {
  return $("#errors").html("I'm sorry, there's been an error. Please try again.")
}
