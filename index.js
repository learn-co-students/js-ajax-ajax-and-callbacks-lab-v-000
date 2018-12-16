function searchRepositories() {
  let searchInput = $('#searchTerms')[0].value
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/search/repositories?q=${searchInput}`);
  req.send();
}

function displayRepositories() {
  let repositories = JSON.parse(this.responseText).items;
  let repositoriesList =
  '<ul>' +
  repositories.map( r => {
    return `
      <li>
        <h2><a href="${r.html_url}" target="_blank">${r.name}</a> <br /></h2>
        Description: ${r.description} <br />
        <a href="#" data-repository="${r.name}" data-owner="${r.owner.login}" onclick="showCommits(this)">Show Commits</a> <br />
        <br />
        <strong>Owner:</strong> <br />
        <img src="${r.owner.avatar_url}" height="32" width="32"> <br />
        <a href="${r.owner.html_url}" target="_blank">${r.owner.login}</a> <br />
      </li> <br />`;
  }).join('') +
  '</ul>'

  $('#results')[0].innerHTML = repositoriesList;
}

function showCommits(list_item) {
  const repository = list_item.dataset.repository;
  const owner = list_item.dataset.owner;
  const apiUri = `https://api.github.com/repos/${owner}/${repository}/commits`;
  const commitRequest = new XMLHttpRequest();
  commitRequest.addEventListener('load', displayCommits);
  commitRequest.open('GET', apiUri);
  commitRequest.send();
}

function displayCommits() {
  let commits = JSON.parse(this.responseText);
  let commitsList =
    '<ul>' +
      commits.map(
        c => {
          return `
          <li>
            SHA: ${c.sha} <br />
            Author: ${c.commit.committer.name} <br />
            Author Username: ${c.committer.login} <br />
            Author Avatar: <img src="${c.committer.avatar_url}" height="32" width="32" />
          </li>`;
        }).join('') +
    '</ul>';

    $('#details')[0].innerHTML = commitsList;
}

function displayError() {
  $('#errors')[0].innerHTML = "<p>I'm sorry, there's been an error. Please try again.)</p>";
}

$(document).ready(function (){
  $.get( "index.html", function(data) {
    $( ".result" ).html(data);
  }).fail(displayError);
});
