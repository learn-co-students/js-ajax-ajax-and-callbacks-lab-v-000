

var displayError = () => $('#errors').html("I'm sorry, there's been an error. Please try again.")




function showCommits(el) {
  
}

function searchRepositories() {
  
  const searchTerms = $("#searchTerms").val()
  
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, response => {
    $('#results').html()
  })
}


$(document).ready(function (){
});
