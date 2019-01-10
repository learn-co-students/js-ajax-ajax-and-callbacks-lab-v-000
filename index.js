$(document).ready(function (){

});
function searchRepositories() {
  const searchTerms = document.getElementById('searchTerms').value
  $.get('https://api.github.com/search/repositories?q=' + searchTerms, function(response) {
    // debugger
    $('#results').html("<ul>" +
    response.items.map(function(r) {
      return '<li>' +
      r.name +
      ' - ' +
      r.description +
      ' - <a href="https://github.com/'
      r.full_name +
      '">Link</a>' +
      '</li>'
    }).join('') +
     "</ul>")
  }).fail(function(error) {
    displayError()
  })
}

function showCommits(el) {
  const name = el.dataset.repo
  const user = el.dataset.owner
  $.get(`https://api.github.com/repos/${user}/${name}/commits`, function(response) {
    $('details').html("<ul>" +
      response.items.map(function(r) {
        return '<li>' +
        r.sha +
        '</li>'
      }).join('') +
    "</ul>")
  }).fail(function(error) {
    displayError()
  })
}

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}
