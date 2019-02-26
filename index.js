function searchRepositories() {
  const searchTerm = document.getElementById("searchTerms").value;
  const url = 'https://api.github.com/search/repositories?q=' + searchTerm;
  $.get(url, function(response) {
    const repoList = response.items.map(function(repo) {
      return `<div>${repo.name}</div><br>` +
      `<div>${repo.description}</div><br>` +
      `<div><a href=# ${repo.html_url}</div><br>` +
      `<div>${repo.name}</div><br>` +
      `<div>${repo.name}</div><br>` +
      `<div>${repo.name}</div><br>` +
      '<div><a href="#" onclick="showCommits(this)">Show Commits</a></div>'
    })
    document.getElementById('results').innerHTML = repoList;
  }).fail(function() {
    displayError()
  });
}

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

function showCommits(el) {
  const username = el.dataset.owner;
  const repository = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + repository + '/commits');
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><strong>' +
        commit.author.login +
        commit.commit.author.name +
        '</strong> - ' +
        commit.commit.message +
        commit.sha +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}
