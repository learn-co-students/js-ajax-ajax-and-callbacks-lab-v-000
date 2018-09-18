$(document).ready(function (){
});

var searchRepositories = () => {
    let searchTerms = $('#searchTerms').val()
    $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
        $('#results').html(renderSearchResults(data))
      }).fail(error => {
          displayError()
      })
}


  var renderSearchResults = (data) => data.items.map( result => renderSearchResult(result))

  var showCommits = (el) => {
      $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
          $('#details').html(renderCommits(data))
      }).fail(error => {
          displayError()
      })
  }


  var renderCommits = (data) => {
      let result = data.map((commit) => renderCommit(commit)).join('')
      return `<ul>${result}</ul>`
  }

  var renderCommit = (commit) => {
      return `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
  }

  var displayError = () => $('#errors').html("Error! Error!")

var renderSearchResult = (result) => {
    console.log(result)
  return `
      <div>
        <h2><a href="${result.html_url}">${result.name}</a></h2>
        <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
        <p>${result.description}</p>
        <p><strong>Owner: </strong>${result.owner.login}</p>
        <p><a href=${result.owner.html_url}>Profile</a></p>
        <p><img src=${result.owner.avatar_url} alt="profile image"></p>
      </div>
      <hr>
    `
}