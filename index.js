function displayError() {
  $("#errors").text("error")
}

function showCommits(clickedElement) {
  const jqXhr = $.get(`https://api.github.com/repos/${clickedElement.dataset.owner}/${clickedElement.dataset.repository}/commits`)

  jqXhr.done(function (data) {
    const commitsHtml = data
      .map(commit => `<li>${commit.sha}</li>`)
      .join("")
    $("#details").html(`<ul>${commitsHtml}</ul>`)
  })
  jqXhr.fail(displayError)
}

function searchRepositories(event) {
  const q = $("#searchTerms").val()

  const jqXhr = $.get("https://api.github.com/search/repositories", {
    q
  })
  jqXhr.done(function (data) {
    const resultsHtml = data
      .items.map(repo => `<li data-repository="${repo.name}" data-owner="${repo.owner.login}">${repo.name}: ${repo.description}</li>`)
      .join("")
    $("#results").html(`<ul>${resultsHtml}</ul>`)
  })
  jqXhr.fail(displayError)
}

$(document).ready(() => {
  $("#search").click(searchRepositories)
  $("#results").on('click', "li", function (event) {
    showCommits(event.target)
  })
});