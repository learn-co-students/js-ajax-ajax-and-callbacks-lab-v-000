$(document).ready(function (){
});



function searchRepositories() {
  const base = 'https://api.github.com/search/repositories?'
  const terms = {
    q: searchTerms.value
  }
  const url = base + $.param(terms)
  $.get(url).done(displayRepositories).fail(displayError)
}

function displayRepositories(data) {
  const searchTerms = $('#searchTerms')[0]
  const results = $('#results')[0]
  const details = $('#details')[0]

  // console.log('success', data)
  results.html = ''
  data.items.forEach(rep => {
    results.innerHTML += `<div class='res'>
    ${rep.name}<br>
    ${rep.description}<br>
    <a href="${rep.html_url}">Link</a><br>
    <a data-repository="${rep.name}" data-owner="${rep.owner.login}" onclick="showCommits(this)" href="#">
    Show Commits</a><br>
    by ${rep.owner.login}<br>
    <a href="${rep.owner.html_url}">Profile</a><br>
    <img src="${rep.owner.avatar_url}">
    </div><br>`
  })
}

function displayError(error) {
  console.log('error', error)
  const errors = $('#errors')[0]
  errors.innerHTML = 'there was an error, please try again'
}

function showCommits(element) {
  // console.log(element)
  let rep = element.dataset.repository
  let owner = element.dataset.owner
  const url = `https://api.github.com/repos/${owner}/${rep}/commits`
  // console.log(url)
  $.get(url).done(displayCommits).fail(displayError)
}

function displayCommits(data) {
  const details = $('#details')[0]
  details.innerHTML = ''
  console.log(data[0])
  data.forEach(commit => {
    details.innerHTML += `
      <div class='res'>
      ${commit.sha}<br>
      ${commit.commit.author.name}<br>

    `
  })
}
