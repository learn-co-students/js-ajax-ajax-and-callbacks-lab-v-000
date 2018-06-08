function displayError() {
  $('#errors').html('error')
}

function searchRepositories() {
  const searchTerms = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
    $('#results').html(data.items.map(result => result.name))
  })
}

function showCommits(el) {
  const owner = el.dataset.owner
  const repo = el.dataset.repository
  $.get(`https://api.github.com/repos/${owner}/${repo}/commits`, data => {
    $('#details').html(data.map(commit => commit.sha))
  })
}
