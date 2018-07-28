

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

var createCommit = function(commit) {

  return `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p>
  <p>Author: ${commit.commit.author.name}</p> <p> Author login:${commit.author.login} </p><img src="${commit.author.avatar_url}" alt="avatar" height="42" width="42"> </li>`
}

var renderCommits = function(data) {
  console.log(data)
  let result = data.map((commit)=>createCommit(commit)).join('')
  return `<ul>${result}</ul>`
}

var showCommits = (arg) => {
  $.get(`https://api.github.com/repos/${arg.dataset.owner}/${arg.dataset.repository}/commits`, function(data) {
    $('#details').html(renderCommits(data))
  }).fail(error => {
    displayError()
  })
}

var createResultDiv = (result) => {
  return `
      <div>
        <h2><a href="${result.html_url}">${result.name}</a></h2>
        <p>Owner Login: ${result.owner.login} </p>
        <p><a href="${result.owner.url}"> Profile Page </a> </p>
        <img src ="${result.owner.avatar_url}" alt="avatar" height="42" width="42">
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
