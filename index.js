$(document).ready(function (){
});
// https://api.github.com/search/repositories?

function searchRepositories() {
  var searchValue = document.getElementById("searchTerms").value
  var url = "http://api.github.com/search/repositories?q=";
  $.get((url+searchValue), function(data) {
    console.log(data);
    // $('#results').html(formatFunction(data));
  })
}

// formatFunction(data) {
//   return ``
// }


// function getRepositories() {
//   const req = new XMLHttpRequest()
//   req.addEventListener("load", showRepositories);
//   req.open("GET", 'https://api.github.com/users/octocat/repos')
//   req.send()
// }
