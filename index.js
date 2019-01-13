$(document).ready(function (){
});

//display should include repo name, description, url of HTML, owner login, repository owner avatar as image, url for owners profile
//include a showCommits() link
function searchRepositories(){
  const searchTerms = $('#searchTerms').val();
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(response){
    const r = response.items;
    let reposHTML = [];
    r.forEach(function(item){
      reposHTML += `
      <div>
        <h4>${item.name}</h4>
        <p>${item.description}</p>
        <a href="${item.html_url}">Go to repo</a>
        <p>${item.owner.login}</p>
        <img src="${item.owner.avatar_url}" width="25px">
        <a href="${item.owner.url}">Go to owner</a>
        <a href="#" data-owner="${item.owner.login}" data-repository="${item.name}" onclick="showCommits(this)">Show Commits</a>
      </div>`;
    })
    $('#results').html(reposHTML);
  }).fail(function(error){
    displayError();
  });
}

//display in details, listing the SHA, author, authors login, and avatar as an image
function showCommits(i) {
  const repo = i.dataset.repository;
  const owner = i.dataset.owner;
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
  }).fail(function(error){
    displayError();
  });
}

function displayError(){
  document.getElementById('errors').innerHTML = "I'm sorry, there's been an error. Please try again";
}
