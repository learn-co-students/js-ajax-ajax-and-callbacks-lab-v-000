$(document).ready(function (){
});

function displayError () {
  $("#errors").html("There's been an error with your request. Please try again.");
}

function searchRepositories(){
  const searchTerms = $('#searchTerms').val();
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
    $('#results').html(displayRepositories(data))
  }).fail(error => {
    displayError();
  });
}

function displayRepositories (data) {
  return data.items.map(result => {
    return `
    <div>
      <h2><a href="${result.html_url}">${result.name}</a></h2>
      <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
      <p>${result.description}</p>
    </div><br>`
  });
}

function showCommits(data){
  $.get(`https://api.github.com/repos/${data.dataset.owner}/${data.dataset.repository}/commits`, data =>{
    $('#details').html(displayCommits(data))
  }).fail(error => {
    displayError();
  });
}

function displayCommits (data) {
  let result = data.map((commit) => {
    return `
      <div>
        <li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>
      </div>`
  }).join('');
    return `<ul>${result}</ul>`;
}
