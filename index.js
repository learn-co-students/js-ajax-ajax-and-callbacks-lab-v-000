$(document).ready(function(){
  });

function showCommits(repo, owner) {
  $.get(`https://api.github.com/repos/owner/repo/commits`, function(response) {
    console.log(response);
  $("#details").html(response.map(r => commitsTemplate.call(r)));
  })


}

function searchRepositories() {
    let search = document.getElementById("searchTerms").value;
    $.get(`https://api.github.com/search/repositories?q=${search}`, function(response) {
      console.log(response);
    $("#results").html(response.items.map(r => repoTemplate.call(r)))
    }).fail(displayError())
}

function displayError() {
  $("#errors").html("<p>I'm sorry, there's been an error. Please try again.</p>");
}

function repoTemplate() {
  return `<ul>
    <li>Name: <a href="${this.html_url}">${this.name}</a></li>
    <li>Description: ${this.description}</li>
    <li>Owner: ${this.owner.login}</li>
    <li><img src="${this.owner.avatar_url}"></li>
    <li>Owner's Page: ${this.owner.html_url}</li>
    <li><a href="#" onclick="showCommits('${this.name}', '${this.owner.login}')">Show Commits</a></li>
    </ul>`
}

function commitsTemplate() {
  return `<ul>
    <li>${this.sha}</li>
    </ul>`
}
