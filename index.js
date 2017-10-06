function searchRepositories() {
  const searchTerms = $("#searchTerms").val();

  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(data) {
    $('#results').html(repoResults(data))
  }).fail(error => {
    displayError();
  })
}

function repoResults(data) {
  return data.items.map((result) => {
    return `
        <div>
          <h2><a href="${result.html_url}">${result.name}</a> <img src="${result.owner.avatar_url}" height="32" width="32"/> </h2>
          <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
          <p>${result.description}</p>
        </div>
        <hr>
      `
  })

  // let repoTemplate = document.getElementById("repository-template").innerHTML;
  // let template = Handlebars.compile(repoTemplate)
  //
  // let repoList = template(data)
  // return repoList;
}

function showCommits(el) {
  const owner = el.dataset.owner;
  const repository = el.dataset.repository;

  $.get(`https://api.github.com/repos/${owner}/${repository}/commits`, function(data) {
    $('#details').html(commitResults(data));
  }).fail(error => {
    displayError()
  })
}

function commitResults(data) {
  return data.map((commit) => {
    return `
      <h3>${commit.sha}</h3>
      <p>${commit.commit.message}</p>
      Author: ${commit.author.login} <img src="${commit.author.avatar_url}" height="32" width="32"/>
      <hr>
    `
  })

  // let commitTemplate = document.getElementById("commit-template").innerHTML;
  // let template = Handlebars.compile(commitTemplate);
  //
  // let commitList = template(data);
  // return commitList;
}

function displayError() {
  $('#errors').html("There has been an error!")
}
