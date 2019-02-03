import { throws } from "assert";

$(document).ready(function (){

//     $.get('index.html', function(response) {
//         $('#result').html(response);
//     });

//     var url =
//     'https://api.github.com/repos/rails/rails/commits?sha=82885325e04d78fb7ec608a4670164d842d23078';
 
//    $.get(url).done(function(data) {
//     console.log('Done');
//     console.log(data);
//      });

//     $.get('this_doesnt_exist.html', function(data) {
//         // This will not be called because the .html file request doesn't exist
//         doSomethingGood();
//             }).fail(function(error) {
//         // This is called when an error occurs
//         console.log('Something went wrong: ' + error.statusText);
//         });


});

 function displayError(){
     $('#errors').html("Im sorry, there's been an error.Please try again.");
 }
function searchRepositories() {
    var data = document.querySelector("#searchTerms").value
    const req = new XMLHttpRequest();
    req.addEventListener('load', showRepos);
    req.open('GET', `https://api.github.com/search/repositories?q=${data}`);
    req.send();

  }

  function showRepos(){
        //const repos = JSON.parse(this.responseText)
    //    #iterate through this.repsonseText
    //    append to result div
    //const repoList = repos.map(r => `<li><a href=${r.html_url}>${r.name}</a></li>`).join('')
    //document.getElementsByTagName('result').innerHTML = "<ul>" + repoList + "</ul>";
  }


//   function showCommits(event, data) {
//     const repos = JSON.parse(this.responseText);
//     const src = document.getElementById('results').innerHTML;

//     document.getElementById('repositories')
//   }