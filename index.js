var url = 'https://api.github.com/search/repositories'

$(document).ready(function (){
});

function searchRepositories() {
  var searchTerms = $('#searchTerms').val()
  $.get(url + "?q=" + searchTerms, function(response) {
    returnResults(response);
  }).fail(function(error) {
    displayError();
  });
}

  function returnResults(response) {
    response.items.map(item => {
     $("#results")
       .append("Name" + item.name)
       .append("Description" + item.description)
       .append("URL" + item.html_url)
       .append(item.owner.login)
       .append(item.owner.avatar_url)
       .append(item.owner.url)
       .append(`<a href="#" data-owner="${item.owner.login}" data-repository="${item.name}" onclick="showCommits(this)">Show Commits</a><br>`)
    })
 }

 function showCommits(item) {
   var commitsURL = 'https://api.github.com/repos'
   $.get(commitsURL +  "/" + item.dataset.owner + "/" + item.dataset.repository + "/commits", function(response) {
     response.map(item => {
       debugger;
       $("#details")
        .append(`<p> ${item.sha} </p>`)
        .append(`<p> ${item.author.url} </p>`)
        .append(`<p> ${item.author.login} </p>`)
        .append(`<p> ${item.author.avatar_url} </p>`)
    })
  })
}

 function displayError() {
   $('#errors').append("I'm sorry, there's been an error. Please try again.")
 }
