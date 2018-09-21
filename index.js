$(document).ready(function (){

});

function searchRepositories() {
  let searchTerm = document.getElementById("searchTerms").value
  let url = 'https://api.github.com/search/repositories?q=' + searchTerm
  $.get(url).done(function (info) {
    let repoList = info.items.map(function (element) {
      let description = "No Data"
      if (element.description !== null) {
        description = element.description
      }
      return `<div><strong>${element.name}</strong></div>
      <ul>
        <li>${description}</li>
        <li><u>${element.html_url}</u></li>
        <li>${element.owner.login}</li>
        <li><a href="#" data-repository="${element.name}" data-owner="${element.owner.login}" onclick="showCommits(this)">Show Commits</a></li>
      </ul>`
    })
    $('#results').html(searchTerm + "<br><br>" + repoList.join(""))
  }).fail(function (error) {
    displayError(error)
  })
}

function displayError(error) {
  $('#results').html("")
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
  console.log("something's gone wrong!")
}

function showCommits(element) {
  let searchTerm = element.dataset.owner
  let repoName = element.dataset.repository
  let url = 'https://api.github.com/repos/' + searchTerm + '/' + repoName + '/commits'

  $.get(url).done(function (info) {
    let detailList = info.map(function (element) {
      let login = "Anonymous"
      if (element.author !== null) {
        login = element.author.login
      }
      let avatar = ""
      if (element.committer !== null) {
        avatar = element.committer.avatar_url
      }
      return `<div><strong>${login}</strong></div>
      <img src="${avatar}" alt="Avater Image" width="40" height="40">
      <ul>
        <li>By: ${element.commit.author.name}</li>
        <li>URL: <u>${element.html_url}</u></li>
        <li>SHA: ${element.sha}</li>
      </ul>`
    })
    $('#details').html(detailList.join(""))
  }).fail(function (error) {
    displayError(error)
  })
}

// --------------------
