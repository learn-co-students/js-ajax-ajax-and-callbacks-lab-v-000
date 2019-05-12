$(document).ready(function (){

});

function displayError() {
  $("#errors").append("I'm sorry, there's been an error. Please try again.");
}

function showCommits(el) {
  const repository = el.dataset.repository
  const owner = el.dataset.owner
  $.get(`https://api.github.com/repos/${owner}/${repository}/commits`, function(data){
    const commitList = '<ul>' + data.map(c => {
     return (`
            <li>
            <section>
              <header><h4>Created By ${c.author.login} </h4></header>
              <img src="${c.author.avatar_url}" height="32" width="32">
              <p>${c.sha}</p>
            </section>
            <p>Name: ${c.commit.author.name}</p>
            </li>`
            )
    }).join('') + '</ul>'
    $("#details").append(commitList);
  }).fail(displayError);
}

function searchRepositories() {
  const input = $("#searchTerms").val();
  $.get(`https://api.github.com/search/repositories?q=${input}/`, function(data) {
    const repoList = '<ul>' + data.items.map(r => {
     return (`
            <li>
            <section>
              <header><h4>Created By ${r.owner.login} </h4></header>
              <img src="${r.owner.avatar_url}" height="32" width="32">
            </section>
              <h2><a href="${r.html_url}">${r.name}</a></h2>
              <p>Description: ${r.description}</p>
              <a href="#" data-owner="${r.owner.login}" data-repository="${r.name}" onclick="showCommits(this)">Show Commits</a>
            </li>`
            )
    }).join('') + '</ul>'
    $("#results").append(repoList);
  }).fail(displayError);
}
