$(document).ready(function() {});

function searchRepositories() {
  let searchTerms = $('#searchTerms').val();
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(response) {

    let repos = "";
    for (var i = 0; i < response.items.length; i++) {
      repos += '<h3>Name: <a href="#" target="_blank">' +
        response.items[i].name +
        '</a> </h3> <p> <a href="#" data-repository="' +
        response.items[i].name +
        '" data-owner="' +
        response.items[i].owner.login +
        '" onclick="showCommits(this)">Show Commits</a></p><p>' +
        response.items[i].description + '</p><hr>'
    }
    $('#results').html(repos)
  }).fail(error => {
    displayError()
  });
}

function showCommits(element) {
  $.get('https://api.github.com/repos/' + element.dataset.owner + "/" + element.dataset.repository + '/commits',
    function(response) {
      let commits = "";
      for (var i = 0; i < response.length; i++) {
        commits += '<li>' +
          '<h3>' + response[i].sha + '</h3>' +
          '<p>' + response[i].commit.message + '</p></li>'
      }
      $('#details').html(commits);
    }).fail(error => {
    displayError()
  });

}

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}
