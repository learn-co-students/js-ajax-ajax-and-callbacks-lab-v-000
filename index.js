$(document).ready(function (){
});

function displayError() {
  $("#errors").html("I'm sorry, there's been an error. Please try again.");
}

function renderCommit(commit) {
  return `
    <li>
      <img style="padding-right:5px; float:left;" class="img" src="${commit.author.avatar_url}" width="15%" height="15%" />
      <span><strong>Username:</strong> ${commit.author.login}</span><br>
      <span><strong>Name:</strong> ${commit.commit.author.name}</span><br>
      <span><strong>SHA:</strong> ${commit.sha}</span><br>
      <small style="opacity:0.5;">
        ${commit.commit.message}
      </small>
    </li>
  `
}

function renderCommits(data) {
  $("#details").html(`
    <div>
      <ol>
        ${data.map(commit => renderCommit(commit)).join("<br>")}
      </ol>
    </div>
  `);
}

function showCommits(el) {
  const repository = el.dataset.repository;
  const owner = el.dataset.owner;
  const url = `https://api.github.com/repos/${owner}/${repository}/commits`;
  console.log(url)
  $.get(url)
    .done(results => renderCommits(results))
    .fail(error => displayError());
}

function renderSearchResult(result) {
  return `
    <div>
      <hr>
      <h3><a href="${result.html_url}" target="_blank">${result.name}</a></h3>
      <img class="img" src="${result.owner.avatar_url}" height="25%" width="25%" />
      <p>Owner: <a href="${result.owner.html_url}">${result.owner.login}</a><br>
      Commits: <a href="#" onclick="showCommits(this)" data-owner="${result.owner.login}" data-repository="${result.name}">Commits</a></p>
      <p>${result.description}</p>
    </div>
  `
}

function renderSearchResults(data) {
  console.log(data);
  return data.items.map(result => renderSearchResult(result));
}

function searchRepositories() {
  console.log('test');
  const searchTerms = $("#searchTerms").val();
  const uri = `https://api.github.com/search/repositories?q=${searchTerms}`;
  $.get(uri)
    .done(data =>{
       $("#results").html(renderSearchResults(data));
       const hi = renderSearchResults(data);
     }).fail(error => {
       displayError();
     });
}
