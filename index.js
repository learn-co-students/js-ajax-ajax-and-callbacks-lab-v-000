
function searchRepositories() {
  let term = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${term}`, data => {
    console.log(getItems(data));
    $("#results").html(getItems(data));
  }).fail(error => {
      displayError()
    })
;
};

function getItems(data) {
  return data.items.map(result => {
    return formatItems(result);
  });
};

function formatItems(result) {
  return `<div>
        <h2><a href="${result.html_url}">${result.name}</a></h2>
        <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
        <p>${result.description}</p>
      </div> `
};

function showCommits(el) {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
    $('#details').html(getCommits(data))
  }).fail(error => {
    displayError()
  })
}

function getCommits(data) {
  let result = data.map((commit)=>formatCommit(commit)).join('')
  return `<ul>${result}</ul>`
}

function formatCommit(commit) {
  return `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
}

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

$(document).ready(function (){

});
