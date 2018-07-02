$(document).ready(function (){
});

function searchRepositories() {
  const search = $("#searchTerms").val();
  let url = `https://api.github.com/search/repositories?q=${search}`
  $.get(url, function(response) {
    // $("#results").html(response); do something with response data
    let repoResults = `${response.items.map(r => renderResponse(r)).join('')}`
    $('#results').html(repoResults);
  }).fail(displayError());
};

function renderResponse(r) {
  return`
        </div> 
          <h2><a href="${r.html_url}">${r.name}</a</h2>
          <p><a href="#" data-repository="${r.name}" data-owner="${r.owner.login}" onclick="showCommits(this);">Show Commits</a></p>
          <p>${r.description}</p>
          <p><img src=${r.owner.avatar_url}</p>
        </div>
        `
}

function showCommits(response) {
  let url = `https://api.github.com/repos/${response.dataset.owner}/${response.dataset.repository}/commits`
  $.get(url, function(response) {
    let commitResults = `${response.map(r => displayCommits(r)).join('')}`
    $('#details').html(commitResults)
  }).fail(displayError());
}

function displayCommits(r) {
    return `
          <div>
            <p>SHA: ${r.sha}</p>
            <p>Author: ${r.commit.author.name}</p>
            <p>Author Login: ${r.author.login}</p>
            <p><img src=${r.author.avatar_url}</p>
          </div>
          `
}


function displayError() {
  const errorMessage = "I'm sorry, there's been an error. Please try again."
  $("#errors").html(errorMessage)
}



// repo name, description, link to HTML URL, repo owner login, repo 
// owner avatar as an image, link to ownerprofile page
// display in results div