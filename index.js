function searchRepositories() {
  let searchTerms = $("#searchTerms")[0].value;

  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(response) {
    $("#results").html(displaySearchResults(response));
  }).fail(error => displayError());
};

function displaySearchResults(response) {
  return response.items.map(result => {
    return `
      <div>
        <h2><a href="${result.html_url}">${result.name}</a></h2>
        <p>Description: ${result.description}</p>
        <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
      </div>
    `;
  });
}

function displayError() {
  $("#errors").html("<h3>I'm sorry, there's been an error. Please try again.</h3>");
}

function showCommits(el) {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, function(response){
    $("#details").html(displayCommits(response));
  }).fail(error => displayError());
}

function displayCommits(response) {
  return response.map(result => {
    return `
      <div>
        <p>SHA: ${result.sha} </p>
        <p>Author: ${result.commit.author.name} </p>
        <p>Author Login: ${result.author.login} </p>
        <p><img width="50px" height="50px" src="${result.author.avatar_url}"></p>
      </div>
    `
  })
}
