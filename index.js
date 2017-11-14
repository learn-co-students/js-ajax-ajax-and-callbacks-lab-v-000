$(document).ready(function (){

});

function searchRepositories() {
  const searchTerms = $("#searchTerms")[0].value;
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, response => {
    // console.log(response.items);
    const results = response.items
    const src = $("#results-template")
    const template = Handlebars.compile(src)
    const resultsInTemplate = template(results)
    $("#results").html(resultsInTemplate);
  }).done();
}
