$(document).ready(function (){
  });




  function searchRepositories(){
   const searchTerms = document.getElementById('searchTerms').value;
    $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(response){
      let namehtml = ''
      for (const el of response.items){
        namehtml += `<p>${el.name}</p>`
        $('#results').html(namehtml)
      }
    })
  }


  function showCommits(el){
  let url = 'https://api.github.com/repos/' + el.dataset.owner + '/' + el.dataset.repository + '/commits'
  $.get(url, function (response){
    let shahtml = ''
    for (const el of response){
      shahtml += `<p>${el.sha}</p>`
      $('#details').html(shahtml)
    }
  })
}



function displayError(){
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}




// function searchRepositories(event, data){
//   // The val() method returns or sets the value attribute of the selected elements
//  const searchTerms = document.getElementById('searchTerms').value;
//  // The $.get() method loads data from the server using a HTTP GET request
//  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(response){
//    // The html() method sets or returns the content (innerHTML) of the selected elements
//    $('#results').html(displayRepositories(response))
//     // The fail() method accepts one or more arguments, all of which can be either a single function or an array of functions
//  }).fail(function (error){
//    displayError();
//  });



 // function displayRepositories(event, data) {
 //   const repos = JSON.parse(this.responseText);
 //   const src = document.getElementById('repository-template').innerHTML;
 //   const template = Handlebars.compile(src);
 //   const repoList = template(repos);
 //   document.getElementById('repositories').innerHTML = repoList;
 // }
