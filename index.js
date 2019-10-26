function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}


function searchRepositories () {
const terms = $('#searchTerms').val()
const search = `https://api.github.com/search/repositories?q=${terms}`
$.get(search, function(data) {
    const items = data.items;
    let reposHTML = "";
    for (let i=0; i < items.length; i++) {
      const item = items[i];
      reposHTML += `
        <div>
          <h4>${item.name}</h4>
          <a href="#" data-owner="${item.owner.login}" data-repository="${item.name}" onclick="showCommits(this)">Show Commits</a>
        </div>`;
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
