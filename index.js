$(document).ready(function (){
});

function searchRepositories() {
  const search = $('#searchTerms')[0].value;
  $.get(`https://api.github.com/search/repositories?q=${search}`, function(data) {
    const items = data.items;
    let reposHTML = "";
    for (let i=0; i < items.length; i++) {
      const item = items[i];
      reposHTML += `
        <div>
          <h4>${item.name}</h4>
          <p>${item.description}</p>
          <a href="${item.html_url}">Go to repo</a>
          <p>${item.owner.login}</p>
          <img src="${item.owner.avatar_url}" width="25px">
          <a href="${item.owner.url}">Go to owner</a>
          <a href="#" data-owner="${item.owner.login}" data-repository="${item.name}" onclick="showCommits(this)">Show Commits</a>
        </div></br></br>`;
    }
    $('#results').html(reposHTML);
  }).fail(function(error) {
    console.log(error)
    return error;
  });
}

function showCommits(el) {
  const repo = el.dataset.repository;
  const owner = el.dataset.owner;
  $.get(`https://api.github.com/repos/${owner}/${repo}/commits`, function(data) {
    const commits = data;
    let commitsHTML = "";
    console.log(data);
    for (let i=0; i < commits.length; i++) {
      const commit = commits[i];
      commitsHTML += `
        <div>
          <p>${commit.sha}</p>
          <p>${commit.author.login}</p>
          <p>${commit.commit.author.name}</p>
          <img src="${commit.author.avatar_url}" width="25px">
        </div>`
    }
    $('#details').html(commitsHTML);
  })
}

function displayError() {
  $('#errors').html("<p>I'm sorry, there's been an error. Please try again.</p>");
}
