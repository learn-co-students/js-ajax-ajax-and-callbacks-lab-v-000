function searchRepositories(event) {
  const q = $("#searchTerms").val()

  const jqXhr = $.get("https://api.github.com/search/repositories", {
    q
  })
  jqXhr.done(function (data) {
    const resultsHtml = data.items.map(repo => `${repo.name}: ${repo.description}`).join("<br>")
    $("#results").html(resultsHtml)
  })
}
$(document).ready(() => {
  $("#search").click(searchRepositories)
});