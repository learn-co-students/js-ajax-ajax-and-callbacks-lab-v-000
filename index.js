$(document).ready(function (){
});

function searchRepositories() {
  let terms = $("#searchTerms").val();
  let url = `https://api.github.com/search/repositories?q=${terms}`
  $.get(url).done(displayResults).fail(displayError)
}
function displayResults(data){
  const list = data.items.map(item => {
    return (`<h2>${item.name}</h2><br>
              <p>${item.description}</p>
              <a href="${item.html_url}">Check It Out</a>
              <a href="#" data-owner="${item.owner.login}" data-repository="${item.name}" onclick='showCommits(this)'>Show Commits</a>
              <div class='owner-info'>
                <h4>${item.owner.login}</h4>
                <img src='${item.owner.avatar_url}'/><br>
                <a href='${item.owner.html_url}'>Profile</a>
              </div>
            `)
  });
  $('#results').html(list)
}

function showCommits(el) {
  const repo = el.dataset
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`).done(displayCommits).fail(displayError)
}

function displayCommits(data) {
  const commits = data.map(commit => {
    return (`
      <h2>SHA: ${commit.sha}</h2>
      <p>Author: ${commit.commit.author.name}</p>
      <p>Login: ${commit.author.login}</p>
      <img src="${commit.author.avatar_url}"/>
      `)
  });
  $('#details').html(commits)
}

function displayError(){
  $('#errors').html("<p>I'm sorry, there's been an error. Please try again.</p>")
}
