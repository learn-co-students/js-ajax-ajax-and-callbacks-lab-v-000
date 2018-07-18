$(document).ready(function (){

});

function searchRepositories(){
  const termsHTML = $('#searchTerms')[0].value;
  const searchTerms = termsHTML.split(' ').join('+');
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(response){
    //put response through templates, pass off to results div
    const templateHTML = $('#repositories-template')[0].innerHTML;
    const template = Handlebars.compile(templateHTML);
    const repositories = template(response);
    $('#results').html(repositories);
  }).fail(displayError);
};

function showCommits(element){
  debugger
  const repo = element.dataset.repository;
  const owner = element.dataset.owner;
  $.get(`https://api.github.com/repos/${owner}/${repo}/commits`, function(response){
    const templateHTML = $('#commits-template')[0].innerHTML;
    const template = Handlebars.compile(templateHTML);
    const commits = template(response);
    $('#details').html(commits);
  }).fail(displayError);
};

function displayError(){
  $('#errors').html("I'm sorry, there's been an error. Please try again");
}
