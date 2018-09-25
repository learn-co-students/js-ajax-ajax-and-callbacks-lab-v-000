$(document).ready(function (){



});

function searchRepositories() {
  let searchText = document.getElementById('searchTerms').value;
  let regex = /\s/
  let searchConverted = searchText.replace(regex, "+");
  let searchUrl = "https://api.github.com/search/repositories?q=" + searchConverted;
  console.log("search URl", searchUrl )

  $.get(searchUrl, function(response){
    // $('#results').html(response);
    console.log("results", response);
  });

}
