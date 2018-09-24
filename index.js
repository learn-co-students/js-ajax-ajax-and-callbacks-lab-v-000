function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.");
};

function resultsData(data) {
  console.log(data.items);
  const repoList =
    data.items.map(function(r) {
        return `<h2>${r.name}</h2> +
        <p>Description: ${r.description}</p> +
        <p>Link to Repository: ${r.html_url}</p> +
        <p>Owner Login: ${r.owner.login}</p> +
        <img src="${r.owner.avatar_url}" alt="Avatar Image"> +
        <p>Owner Profile Page: ${r.owner.url}</p>`;
      })
      console.log(repoList);
  document.getElementById('results').innerHTML = repoList;
};

function searchRepositories() {
  const searchTerms = window.$('#searchTerms').val();
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(data) {
    $('#results').html(resultsData(data))
  }).fail(function(error) {
      displayError();
  })
};

function commitsData(data) {
  const commitList =
    data
     .map(c => {
        return `<h2>SHA: ${c.sha}</h2> +
        <p>Author: ${c.author}</p> +
        <p>Author Login: ${c.author.login}</p> +
        <img src="${c.author.avatar_url}" alt="Avatar Image">`;
      })
  document.getElementById('details').innerHTML = commitList;
};

function showCommits(el) {
  const owner = el.dataset.owner
  const repo = el.dataset.repository

  $.get(`https:\/\/api.github.com\/repos\/${owner}\/${repo}\/commits/`, function(data) {
    $('#details').html(commitsData(data))
  }).fail(function(error) {
      displayError();
  })
};

// $(document).ready(function (){
// });
