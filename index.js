
function displayError() {
  $("#errors").html("Sorry, there's been an error. Please try again.");
}

function searchRepositories(){
  const searchTerms = $("#searchTerms").val();
  const url = `https://api.github.com/search/repositories?q=${searchTerms}`;
  $.get(url, data => displaySearchResults(data)).fail(error => displayError());
}

function displaySearchResults(results){
  const resultString = results.items.map(res => {
    return `
      <div>
        <h2><a href="${res.html_url}">${res.name}</a></h2>
        <p><a href="#" data-repository="${res.name}" data-owner="${res.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
        <p>${res.description}</p>
      </div>
      <hr>
    `
  });
  console.log(resultString);
  $("#results").html(resultString);
}

function showCommits(el){
  const url = `https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`;
  $.get(url, data => displayCommits(data)).fail(error => displayError());
}

function displayCommits(data){
  const commits = data.map(commit => `
    <div id="${commit.sha}">
      <img src="${commit.author.avatar_url}" height="32" width="32">
      <p>Author: ${commit.commit.author.name}</p>
      <p>Username: ${commit.author.login}</p>
      <p>Sha: ${commit.sha}</p>
      <p>Message: ${commit.commit.message}</p>
    </div>
    `).join("");
  const commitsString = `<ul>${commits}</ul>`
  $("#details").html(commitsString);
}
