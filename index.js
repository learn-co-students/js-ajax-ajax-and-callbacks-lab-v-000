$(document).ready(function(){

var searchRepositories = ()=> {
  let userinput = document.getElementById("searchTerms").value;
  console.log("hello");
  $.get(`https://api.github.com/search/repositories?q=${userinput}`, function(data)  {
    let result = data.items.map(item => { return `<p>Name:<a href="${item.html_url}">${item.full_name})</a>`});
     $("#results").html(result);
  }).fail(displayError);
}
function showCommits() {
  console.log("test")
}

function displayError(){
  console.log("I'm sorry, there's been an error. Please try again." );
}
});
