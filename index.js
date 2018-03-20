$(document).ready(function (){
});

function displayError(){
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

function showCommits(el) {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
    $('#details').html(
      '<ul>' + data.map(result => {
        return `<li><h3>${result.sha}</h3><p>${result.commit.message}</p></li>`
        }).join('')
    ) + '</ul>'
  }).fail(error => {
    displayError()
  })
}

function searchRepositories() {
  const searchTerms = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
      $('#results').html(
        data.items.map(result => {
          return `
              <div>
                <h2><a href="${result.html_url}">${result.name}</a></h2>
                <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
                <p>${result.description}</p>
              </div>
              <hr>
            `
        })
      )
    }).fail(error => {
      displayError()
    })
}
