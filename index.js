$(document).ready(function (){
});

function searchRepositories() {
  $.get(`https://api.github.com/search/repositories?q=${document.getElementById("searchTerms").value}`, function(data) {
    resultsHTML = "<ul>" + data.items.map(i => `<li>
      <h2>${i.name}</h2>
      <p><strong>Description:</strong>${i.description}</p>
      <a href=${i.html_url}>View on GitHub</a><br>
      <p>Owner: ${i.owner.login} - <a href="${i.owner.html_url}">View Profile</a></p>
      <img src=${i.owner.avatar_url}><br>
      <!--<a href="#" onclick="showCommits(this)" data-commits-url="${i.url}/commits">Show Commits</a><br>-->
      <a href="#" onclick="showCommits(this)" data-repository=${i.name} data-owner=${i.owner.name}>Show Commits</a><br>
    </li>`).join("") + "</ul>";

    $("#results").html(resultsHTML);
  });
}

function showCommits(repo) {
  $.get(`https://api.github.com/repos/${repo.dataset.owner}/${repo.dataset.repository}/commits`, function(commits) {
    commitsHTML = "<ul>" + commits.map(c => `<li>
      <p>${c.sha}</p>
      <p>Author: ${c.commit.author.name}</p>
      <p>Author Login: ${c.author.login}</p>
      <img src=${c.author.avatar_url}><br>
    </li>`
    ).join("") + "</ul>";
  
    $("#details").html(commitsHTML);
  });
}

function displayError() {
  $("#errors").html("I'm sorry, there's been an error. Please try again.")
}