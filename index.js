
function searchRepositories() {
  let searchTerms = $("#searchTerms")[0].value

  //.val() method is mostly used with HTML form elements to get the value of the input
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(response) {
    $("#results").html(displaySearchResults(response));
  }).fail(error => displayError());
};

function displaySearchResults(response) {
  // return console.log(response)
  return response.items.map(result => {
  return `
    <div>
      <h2><a href="${result.html_url}">${result.name}</a></h2>
      <p><a href="#" onclick="showCommits(this)" data-repository="${result.name}" data-owner="${result.owner.login}" >Commits</a></p>
    </div>
  `
});
}

function displayError() {
  return $("#errors").html("There is an error.");
};

function showCommits(el) {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, function(response) {
    $("#details").html(displayCommits(response));
  }).fail(error => displayError());
}

function displayCommits(response) {
   return response.map(result =>
  `
     <ul><li> ${result.sha} </li>

     </ul>`
   )
}
