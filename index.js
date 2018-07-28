

  // function searchRepositories(){
  //   var searchTerm = $('input#searchTerm').val();
  //   $("#searchRepositories").click(function(){
  //       $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(response){
  //         console.log(response)
  //         $("#results").html(response);
  //       })
  //   });
  // }

  var displayError = () => $('#errors').html("I'm sorry, there's been an error. Please try again.")

var renderCommit = (commit) => {
  return `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
}

var renderCommits = (data) => {
  let result = data.map((commit)=>renderCommit(commit)).join('')
  return `<ul>${result}</ul>`
}

var showCommits = (el) => {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
    $('#details').html(renderCommits(data))
  }).fail(error => {
    displayError()
  })
}

var createResultDiv = (result) => {
  return `
      <div>
        <h2><a href="${result.html_url}">${result.name}</a></h2>
        <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
        <p>${result.description}</p>
      </div>
      <hr>
    `
}

var createResults = (data) => data.items.map( result => createResultDiv(result))

var searchRepositories = function() {


  const searchTerms = $('#searchTerms').val();

  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(response) {
      $('#results').html(createResults(response))
      console.log(response);
    }).fail(error => {
      displayError()
    })

    return false;
}


$(document).ready(function (){
});
