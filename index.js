
function searchRepositories() {
  let term = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${term}`, data => {
    $("#results").html(getItems(data));
  });
};

function getItems(data) {
  data.items.map(result => {
    formatItems(result);
  });
};

function formatItems(result) {
  return
     `<div>
        <h2><a href="${result.html_url}">${result.name}</a></h2>
        <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
        <p>${result.description}</p>
      </div> `
};

$(document).ready(function (){

});
