var displayError = () => $('#errors').html("I'm sorry, there's been an error. Please try again.")

var renderCommit = (commit) => {
  return `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
}

var renderCommits = (data) => {
  let result = data.map((commit)=>renderCommit(commit)).join('')
  return `<ul>${result}</ul>`
}

var showCommits = (el) => {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
    $('#details').html(renderCommits(data))
  }).fail(error => {
    displayError()
  })
}

var renderSearchResult = (result) => {
  return `
      <div>
        <h2><a href="${result.html_url}">${result.name}</a></h2>
        <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
        <p>${result.description}</p>
      </div>
      <hr>
    `
}

var renderSearchResults = (data) => data.items.map( result => renderSearchResult(result))

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



//
// $(document).ready(function () {
//
// });

// var searchRepositories = () => {
//   const searchTerms = $('#searchTerms').val()
//   console.log(searchTerms)
//
//   $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
//     displayRepositories(data)
//   })
// }
//
//
// var displayRepositories = (data) => {
//   const repos = data.items
//   console.log(data)
//   let content = ''
//
//   repos.map(repo => {
//     content += `
//       <h3>${repo.full_name} - ${repo.stargazers_count} stars</h3>
//       <img width="40px" src="${repo.owner.avatar_url}">
//       <p>${repo.description}</p>
//       <a href="${repo.html_url}">View  ${repo.owner.login} on Github</a><br>
//       <a href="#" onclick="showCommits(this)">Show Commits</a>
//     `
//   })
//
//   $('#results').html(content)
// }
//
// var showCommits = (el) => {
//   $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
//     $('#details').html(displayCommits(data))
//   })
// }
//
// var renderCommit = (commit) => {
//   return `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
// }
//
// var displayCommits = (data) => {
//   let result = data.map((commit)=>renderCommit(commit)).join('')
//   return `<ul>${result}</ul>`
// }
