$(document).ready(function (){

});

function displayError() {
  $("#errors").html("error")
}

function searchRepositories(searchTerms) {
  let url = `https://api.github.com/search/repositories?q=${document.getElementById("searchTerms").value}`;
  $.get(url).done(function(response) {
    // let results = response.items[0].name  + " <a href='#' data-repository='"+ response.items[0].name +"' data-owner='"+ response.items[0].owner.login +"'onclick=showCommits(this)> Show Commits </a>";
    console.log(response.items);
    const results = response.items.map(r => { return (
      `<strong><a href="${r.html_url}" target="_blank">${r.name}</a></strong><br />
      <em>${r.description}</em><br />
      <small><a href="#" data-repository="${r.name}" data-owner="${r.owner.login}" onclick="showCommits(this)">Show Commits</a></small>
      <p></p>
      <img src="${r.owner.avatar_url}" width="32"/><br />
      <a href="${r.owner.url}" target="_blank">${r.owner.login}</a>
      <hr>`
    )})
    $("#results").html(results);
  }).fail(error => {
    displayError()
  });
};

function showCommits(e) {
  const repo = e.dataset.repository;
  const user = e.dataset.owner;
  const url = `https://api.github.com/repos/${user}/${repo}/commits`
  $.get(url).done(function(response) {
    console.log(response);
    let commits = response.map(c => { return (
      `${c.sha}<br />
      ${c.commit.message}</p>
      <img src="${c.author.avatar_url}" width="32"/><br />
      By ${c.commit.author.name} (<a href="${c.author.url}" target="_blank">${c.author.login}</a>)
      <hr>`
    )});
    $("#details").html(commits);
  }).fail(error => {
    displayError()
  });
};
