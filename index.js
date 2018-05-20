$(document).ready(function (){
});


function searchRepositories() {
  const term = document.getElementById('searchTerms').value;
  console.log(term);
  const url = `https://api.github.com/search/repositories?q=${term}`
  $.get(url, function () {
    
  })
}



