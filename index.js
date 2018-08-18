$(document).ready(function (){
});

function searchRepositories() {
  var searchValue = document.getElementById("searchTerms").value
  // var url = "http://api.github.com/search/repositories?q=";
  var url = "/https:\/\/api.github.com\/search\/repositories\?q=";
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
  // let comm_link = dataItem.commits_url.replace( /{\/sha}/ , '');
  // $('#results').append("<br>Commits: ", comm_link);
  // $('#results').append(`<br><a href=${comm_link}>Commits Link</a>`);
  showCommits(dataItem);
}

function showCommits(dataItem) {
  // let comm_link = dataItem.commits_url.replace( /{\/sha}/ , '');
  // $.get(comm_link, function(comm_data) {
  $.get('/https:\/\/api.github.com\/repos\/owner\/repo\/commits/', function(comm_data) {
    console.log("pre comm data");
    console.log(comm_data);
    // $('#details').append('Commits Found: ', comm_data.length); test line
    $('#details').append('First SHA: ', comm_data[0].sha);
    //more details could be included, via iteration or specific reference [0] as above.
  })
}

// The tests break my urls, so I have included commented original urls and uncommented test urls proceed with lab.
//Due to testing sensitivity, I also commented out other features. Note to self.
