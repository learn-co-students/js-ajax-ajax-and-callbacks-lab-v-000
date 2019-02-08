// import { create } from "domain";

$(document).ready(function(){

});

 function displayError() {
     $('#errors').html("Im sorry, there's been an error.Please try again.");
 }
function searchRepositories(){
    let data = $("#searchTerms").val();
   let url = `https://api.github.com/search/repositories?q=${data}/`

    $.get(url,function(response){
        var result = `<ul>${response.items.map(r => '<li>' + r.name +
                        `</li><a href="#" data-owner="${r.owner.login}",
                            data-result="${r.name}" onclick="showCommits(this)">
                               Show Commits</a>`)}</ul>`
       
        $("#results").html(result)

    }    
   ) .fail(function(error){
       console.log(displayError)
   })
  }


//  in  showCommits, function that gets the repository's 
// commits from the GitHub API and display them in the details div.
//list the SHA, the author, the author's login, and the author's avatar as an image.

  function showCommits(element) {
      console.log(element)
    //   debugger

    document.getElementById('#repositories')
        let commitURL = `https://api.github.com/repos/${element.dataset.owner}/${element.dataset.result}/commits`
       
        $.get(commitURL,data => {
            let commitsList = `<ul>${data.map( data = '<li><h3>' + data.commit.author.name + ' (' + data.author + ') </h3>' +
             data.sha + "+  +"+'</li>' ).join('') }</ul>`
            $("#details").html(commitsList) 
          }
           ).fail(function(error){
             console.log(displayError)
        });
    }





