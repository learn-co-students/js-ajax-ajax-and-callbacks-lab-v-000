$(document).ready(function() {});

function searchRepositories() {
  let query = document.getElementById("searchTerms").value;
  const apiQuery = "https://api.github.com/search/repositories?q=" + query;
  $.get(apiQuery, function(response) {
    let results = [];
    for (const project of response.items) {
      let projectHash = {};
      projectHash.repository = project.name;
      projectHash.description = project.description;
      projectHash.link = project.html_url;
      projectHash.avatar = project.owner.avatar_url;
      projectHash.owner = project.owner.login;
      projectHash.profile = project.owner.html_url;
      results.push(projectHash);
    }
    displayRepo(results);
  }).fail(function() {
    displayError();
  });
}

function displayRepo(searchObject) {
  const handlebars = document.getElementById("github-repos").innerHTML;
  const template = Handlebars.compile(handlebars);
  const formatted = template(searchObject);
  document.getElementById("results").innerHTML = formatted;
}

function showCommits(el) {
  let owner = el.dataset.owner;
  let repo = el.dataset.repository;
  const apiQuery = `https://api.github.com/repos/${owner}/${repo}/commits`;
  $.get(apiQuery, function(response) {
    let results = [];
    for (const commit of response) {
      let projectHash = {};
      projectHash.repository = repo;
      if (commit.author) {
        projectHash.avatar = commit.author.avatar_url;
      } else {
        projectHash.avatar =
          "https://help.github.com/assets/images/help/profile/identicon.png";
      }
      projectHash.realName = commit.commit.committer.name;
      projectHash.login = commit.author.login;
      projectHash.message = commit.commit.message;
      projectHash.sha = commit.sha;
      results.push(projectHash);
    }
    insertCommits(results);
  }).fail(function() {
    displayError();
  });
}

function insertCommits(searchObject) {
  const handlebars = document.getElementById("github-commits").innerHTML;
  const template = Handlebars.compile(handlebars);
  const formatted = template(searchObject);
  document.getElementById("details").innerHTML = formatted;
}

function displayError() {
  document.getElementById("errors").innerHTML =
    "<p>I'm sorry, there's been an error.Please try again.</p>";
}
