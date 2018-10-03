
function searchRepositories() {
  const search = $('#searchTerms').val();
  $.get(`https://api.github.com/search/repositories?q=${search}`, function(data) {
    $('#results').html(repoTemplate(data));
  }).fail(error => displayError());
}


function repoTemplate(data) {
  return data.items.map(result => `
  <div>
    <a href="${result.html_url}">${result.name}</a>
    <a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a>
    <p>${result.description}</p>
  </div>
  `);
}

function showCommits(repo) {
  $.get(`https://api.github.com/repos/${repo.dataset.owner}/${repo.dataset.repository}/commits`, function(data) {
    $('#details').html(commitTemplate(data));
  }).fail(error => displayError());
};

function commitTemplate(data) {
  return data.map(commit => `
  <li>${commit.sha} - ${commit.author.login} - ${commit.commit.message}</li>
  `)
}

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}
