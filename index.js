$(document).ready(function (){
});

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}


function searchRepositories() {
let searchTerms = $('#searchTerms').val();
let url = `https://api.github.com/search/repositories?q=${searchTerms}`;
$.get(url).done(displayRepositories)
.fail(displayError);
}

function displayRepositories(data){
  const resultList = `<ul>${data.items.map(result => '<li>' +
  '<a href="'+ result.html_url +'">'+ result.name + '</a>' + "  " + '<br>' + 'Repo Description:' + " " + result.description + '<br>' +
  'Owner:' + " " + '<img src= "'+ result.owner.avatar_url +'" style="width=30px; height:30px;"/>' + '<a href="' +result.owner.html_url+'">'+ result.owner.login + '</a><br><br>' +
  '<a <href="#" data-url="'+ result.commit_url + '" onclick="showCommits(this);"> Show Commits</a>'+
   '</li>')
.join('')}</ul>`;
  $('#results').html(resultList);


}


function showCommits(){


}
