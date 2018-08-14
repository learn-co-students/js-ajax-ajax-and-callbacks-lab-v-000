function searchRepositories() {
  let uri = "https://api.github.com/search/repositories?q=";
  let searchTerms = $("#searchTerms").val();
  $.get(`${uri}${searchTerms}`)
    .done(displayRepos)
    .fail(displayError);
}

function displayRepos(data) {
  $("#results").html(data.items.map(repo => {
    return (
      `<ul>
        <li>${repo.name}</li>
        <li>${repo.description}</li>
        <li><a href="${repo.html_url}">Repo Link</a></li><br>
        <li><img src="${repo.owner.avatar_url}" width="100px"></li>
        <li><a href="#{repo.owner.url}"> ${repo.owner.login}'s profile page</a></li>
        <li><a href="#" onclick="showCommits(this);"
            data-owner="#{repo.owner.login}" data-repository="${repo.name}">
            Show Commits</a></li>
        </ul>`
    )
  }).join(""));
};

function showCommits(el) {
  const username = el.dataset.owner;
  const repository = el.dataset.repository;
  let query = `https://api.github.com/repos/${username}/${repository}/commits`;
  $.get(query)
      .done(displayCommits)
      .fail(displayError);
};

function displayCommits(data) {
  $("#details").html(data.map(commit=> {
    return (`<div>
                <img src="${commit.avatar_url}" width="100px"><br>
                <h4>${commit.commit.author.name} - (${commit.author.login})</h4>
                <p>${commit.sha}</p>
              </div>`);
  }).join(""));
};

function displayError() {
  const error = "I'm sorry, there has been an error. Please try again."
    $("#errors").html(error);
};










$(document).ready(function (){
});
