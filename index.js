function displayError() {
  document.getElementById('errors').innerHTML = "<p>I'm sorry, there's been an error. Please try again.</p>";
};

function searchRepositories() {
  const text = document.getElementById('searchTerms').value
  $.get(`https://api.github.com/search/repositories?q=${text}`, function(response) {
    console.log(response);
    showRepositories(response)

  }).fail(function(error) {
    displayError();
  });
};

function showCommits(el) {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repo}/commits`, function(response) {
    const commitList = '<ul>' + response.items.map( r => {
      return `<li>
        <p>${r.sha}</p>
        <p>${r.commit.author.name}<p>
        <p>${r.author.login}</p>
        <img src="${r.author.avatar_url}">
      </li>`
    }).join('') + '<ul>';
    document.getElementById('details').innerHTML = commitList;
  };
};

function showRepositories(response) {
  const repoList = '<ul>' + response.items.map( r => {
    return `<li>
      <h2><a href="${r.html_url}">${r.name}</a></h2>
      <p>${r.description}</p>
      <p><a href="#" data-owner="${r.owner.login}" data-repo="${r.name}" onclick="getCommits(this)">Get Commits</a></p>
      <p>Created By: <a href="${r.owner.url}">${r.owner.login}</a></p>
      <img src="${r.avatar_url}">
    </li>`
  }).join('') + '<ul>';

  document.getElementById('results').innerHTML = repoList;
}

$(document).ready(function (){

});
