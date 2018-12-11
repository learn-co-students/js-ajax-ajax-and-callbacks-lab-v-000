var displayError = () => $('#errors').html("I'm sorry, there's been an error. Please try again.")

let renderCommit = (commit) => {
  return `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
}

let renderCommits = (data) => {
  let result = data.map((commit)=>renderCommit(commit)).join('')
  return `<ul>${result}</ul>`
}

let showCommits = (el) => {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
    $('#details').html(renderCommits(data))
  }).fail(error => {
    displayError()
  })
}

let renderSearchResult = (result) => {
    return `
        <div>
          <h2><a href="${result.html_url}">${result.name}</a></h2>
          <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
          <p>${result.description}</p>
        </div>
        <hr>
      `
}

let renderSearchResults = (data) => data.items.map( result => renderSearchResult(result))

let searchRepositories = () => {
    const searchTerms = $('#searchTerms').val()
    $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
        $('#results').html(renderSearchResults(data))
      }).fail(error => {
        displayError()
      })
}



// curl https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc

//   jQuery .. parentheses when it's a value and angle brackets when it's a variable?
// how is this working? how was I supposed to learn this on my own?
// does this lab have tests I can see?

$(document).ready(function (){
});

// $.get('results', function(respnoses))
