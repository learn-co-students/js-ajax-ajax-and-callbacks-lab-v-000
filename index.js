
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
