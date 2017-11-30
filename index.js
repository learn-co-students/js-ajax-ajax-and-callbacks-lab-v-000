$(document).ready(function () {
});

function searchRepositories() {
  const searchTerms = $('#searchTerms').val();

  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`,
    function (response) {
      $('#results').html(displayRepositories(response));
    }
  ).fail(error => {
    displayError();
  });
}

function displayRepositories(results) {
  const repoList =
    `<ul>
      ${results.items.map(r => {
        const dataRepoName = `data-repository= "${r.name}"`

        const dataUsername = `data-owner= "${r.owner.login}"`

        return (
          '<h2>' +  r.owner.login + '</h2>' +
          `<img src=${r.owner.avatar_url} height="32" width="32">` +
          '<p>' + 'Profile URL: ' + r.owner.url + '</p>' +
          '<h3>' + r.name + '</h3>' +
          '<li>' + 'Description: ' + r.description + '</li>' +
          '<li>' + 'URL: ' + r.html_url + '</li>' +
          '<li>' +
            `<a href='#' ${dataRepoName} ${dataUsername}
              onclick='showCommits(this)'>Show Commits</a>` +
          '</li>' +
          '------------------------------'
        );
      }).join('')}
    </ul>`;

  return repoList;
}

function showCommits(el) {
  const repo = el.dataset.repository;

  const username = el.dataset.owner;

  $.get(`https://api.github.com/repos/${username}/${repo}/commits`,
    function (response) {
      $('#details').html(displayCommits(response));
    }
  );
}

function displayCommits(results) {
  const commitsList =
    `<ul>
      ${results.map(commit =>
        'Author: ' + '<strong>' + commit.commit.author.name + '</strong><br />' +

        'Username: ' + '<em>' + commit.author.login + '</em><br />' +

        `<img src=${commit.author.avatar_url} height="32" width="32">` +

        '<li>' + 'SHA: ' + commit.sha + '</li>' +

        '------------------------------'
      ).join('')}
    </ul>`;

  return commitsList;
}

function displayError() {
  $('#errors').text("I'm sorry, there's been an error. Please try again.");
}
