
var displayError = () => $('#errors').html("I'm sorry, there's been an error. Please try again.")

var searchRepositories = () => {
  let search = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${search}`, function(response){
    let resultName = search[0].toUpperCase() + search.substring(1)

    var results = response.items.map(r => `
      <li>${r.name} - <a href=${r.html_url}>${r.html_url}</a></li>
      <ul>
        <li>${r.description}</li>
        <li>
          <a href="#" data-repository="${r.name}" data-owner="${r.owner.login}" onclick="showCommits(this)">Show Commits</a>
        </li>
      </ul>` ).join('')

    $("#results").html(resultName + '<ul>' + results + '</ul>')
  }).fail(error => {
    displayError()
  })
}

var showCommits = (el) => {

  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits` , function(data){
    //debugger
    let commitsData = data.map(commit =>
      `<ul>
        <li>sha: ${commit.sha}</li>
        <li>author: ${commit.commit.author.name}</li>
        <li>login: ${commit.committer.login}</li>
        <img src="${commit.committer.avatar_url}" height="32" width="32">
      </ul>`).join('')

    $("#details").html(commitsData)
  }).fail(error => {
    displayError()
  })
}

$(document).ready(function (){

});
