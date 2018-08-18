$(document).ready(function (){
});

function searchRepositories() {
  var searchValue = document.getElementById("searchTerms").value
  var url = "http://api.github.com/search/repositories?q=";
  // var url = "/https:\/\/api.github.com\/search\/repositories\?q=";
  $.get((url+searchValue), function(data) {
    // $('#results').append("Name: " + data.items[0].name); //test line
    $('#repositories').append(data.items.forEach(function(dataItem) {
      displayRepositories(dataItem);
    }) )
  }).fail(function (error) {
    displayError(error);
  });
}

$( document ).ajaxSuccess(function( event, request, settings ) {
  $( "#details" ).append( "<li>Successful Request!</li>" );
});

function displayError(error) {
  $('#errors').html('error:', error);
};

function displayRepositories(dataItem) {
  console.log(dataItem);
  console.log('done loading');
  $('#results').append("Name: ", dataItem.name); //username?
  let comm_link = dataItem.commits_url.replace( /{\/sha}/ , '');
  $('#results').append("<br>Commits: ", comm_link);
  $('#results').append(`<br><a href=${comm_link}>Commits Link</a>`);
  showCommits(dataItem);
}

function showCommits(dataItem) {
  // let comm_link = dataItem.commits_url.replace( /{\/sha}/ , '');
  $.get(comm_link, function(comm_data) {
    console.log("pre comm data");
    console.log(comm_data);
    $('#details').append('Commits Found: ', comm_data.length);
  })
}
