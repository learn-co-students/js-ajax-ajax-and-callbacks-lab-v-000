function searchRepositories() {
  let searchTerms = $("#searchTerms")[0].value;
  let template = Handlebars.compile($("#repository-template")[0].innerHTML);
  console.log(searchTerms);
  $.get(`https://api.github.com/search/repositories?q="${searchTerms}"`, function(response) {
    $("#results").html(template(response["items"][0]["responseJSON"]));
  });
};
