
function searchRepositories() {
  let term = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories/q=${term}`, function(data) {
    console.log(data);
    $('div#results').html(data);
  }).fail(function(error) {
    alert("Something went wrong " + error);
  });
}

$(document).ready(function (){

});
