$(document).ready(function (){
});

//display should include repo name, description, url of HTML, owner login, repository owner avatar as image, url for owners profile
//include a showCommits() link
function searchRepositories(){
  const searchTerms = $('#searchTerms').val();
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(response){
    $('results').html(response);
  })
}

//display in details, listing the SHA, author, authors login, and avatar as an image
function showCommits(){

}

function displayError(){
  document.getElementById('errors').innerHTML = "I'm sorry, there's been an error. Please try again";
}
