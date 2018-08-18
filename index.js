function searchRepositories() {
  var searchTerms = $("#searchTerms").val();
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(data) {
    const template = Handlebars.compile($("#results-template").html());
      $("#results").html(template(data));
  }).fail(function(error) {
    displayError();
  })
}

function showCommits(user) {
  const owner = user.dataset.owner;
  const repo = user.dataset.repository;
  $.get(`https://api.github.com/repos/${owner}/${repo}/commits`, function(data) {
    const template = Handlebars.compile($("#commits-template").html());
    $("#details").html(template(data));
  }).fail(function(error) {
    displayError();
  })
}

function displayError() {
  $("#errors").html("I'm sorry, there's been an error. Please try again.");
}

function handlebarsSetup() {
  //put any handlebars setup in here
  Handlebars.registerPartial("userDetails", $("#user-details-partial").html());
}

$(document).ready(function (){
  handlebarsSetup();
});
