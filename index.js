$(document).ready(function (){
 
});

function displayError(){
  $("#error").html("An error has occured.")
}

function successful_server_call(){
  console.log("SUCCESS")
}

function api_call(url, success_callback){
  var jsXHR = $.get(url, successful_server_call)
  jxXHR.fail( displayError ) 
}
function searchRepositories(){
  let search_terms = $("#searchTerms").value() 
  let api_root = "https://api.github.com/search/repositories?"
  let query = `q=${search_terms}`
  api_call(api_root + query, () =>{
    $("#results").html(this.reponseText)
  }.bind(this) )
  
}
function showCommits(){
  api_call(url)
}