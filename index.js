$(document).ready(function (){



});

function buildHTML(response){
  let responseHTML;


  $('#results').html(responseHTML);
}

function searchRepositories() {
  let searchText = document.getElementById('searchTerms').value;
  let regex = /\s/
  let searchConverted = searchText.replace(regex, "+");
  let searchUrl = "https://api.github.com/search/repositories?q=" + searchConverted;
  console.log("search URl", searchUrl )

  $.get(searchUrl, function(response){
    $('#results').html(response);

    // Display the collection of repositories inside the results div. Include repository name, description, and a link to the HTML URL. Also include repository owner login,
    // repository owner avatar as an image, and a link to the owners profile page. Hint: Pay close attention to the structure of the search results!
    console.log("results", response);
  });

}

function showCommits() {

}

function displayError(){

}
