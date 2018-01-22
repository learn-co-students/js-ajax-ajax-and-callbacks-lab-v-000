var displayError = () => $('#errors').html("I'm sorry, there's been an error. Please try again.")

var renderCommit = (commit) => {
  return `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
}

var mapCommits = (data) => {
  let result = data.map((commit)=>renderCommit(commit)).join('')
  return `<ul>${result}</ul>`
}

var showCommits = (el) => {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
    $('#details').html(mapCommits(data))
  }).fail(error => {
    displayError()
  })
}

var renderSearchHTML = (item) => {
  return `
      <div>
        <a href="${item.html_url}">${item.name}</a>
        <p><a href="#" data-repository="${item.name}" data-owner="${item.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
        <p>${item.description}</p>
      </div>
      <hr>
    `
}

var renderSearchResults = (data) => data.items.map( item => renderSearchHTML(item))

var searchRepositories = () => {
  const searchTerms = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
      $('#results').html(renderSearchResults(data))
    }).fail(error => {
      displayError()
    })
}

$(document).ready(function (){
});
