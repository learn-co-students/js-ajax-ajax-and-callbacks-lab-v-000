function searchRepositories() {
  const terms = $('#searchTerms').val();

  $.get(`https://api.github.com/search/repositories?q=${terms}`, function(res) {
    displayResults(res);
  })
    .fail(displayError());
}

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

function displayResults(data) {
  // format res
  const html = data.items.map (res =>
  `<a href="${res.html_url}">${res.name}</a><p><a href="#" data-url="${res.owner.login}" onclick="showCommits(this)">Show Commits</a></p><p>${res.description}</p>`);
  // insert data
  $('#results').html(html)
}

function showCommits(el) {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, function (data) {

  const html = "<ul>" + data.map(commit => `<li> ${commit.commit.author.name} - ${commit.commit.message} - ${commit.sha}</li>`).join('') + "</ul>";

  $('#details').html(html);
  })
}



$(document).ready(function (){
});
