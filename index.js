$(document).ready(function (){
});

function searchRepositories() {
  let input = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${input}`, function(response) {
    console.log(response.items)
    let result = response.items.map(r => `<li>
      <h2> Name: <a href="${r.html_url}">${r.name}</a></h2>
      <p>${r.description}</p>
      <p><a href="#" onclick="showCommits(this);return false;" data-repo="${r.name}" data-owner="${r.owner.login}">Show Commits</a></p>
      <img src="${r.owner.avatar_url}" />
      Owner Name: <a href="${r.owner.url}">${r.owner.login}</a>
      </li>
      `).join("")
    $('#results').html(result)
  }).fail(function(errors){
    displayError()
  })
}

function showCommits(repo) {
  let query = `https://api.github.com/repos/${repo.dataset.owner}/${repo.dataset.repository}/commits`;

  $.get(query, function(response){
    commits = response.map(commit => `<li>
      <h2>Author: <a href="${commit.author.html_url}">${commit.author.login}</a> </h2>
      <p> SHA: ${commit.sha} </p>
      <img src="${commit.author.avatar_url}" />
    </li>`).join('')

    $("#details").html(`<ul>${commits}</ul>`);
  }).fail(function(errors){
    displayError()
  });
}


function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}
