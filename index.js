$(document).ready(function (){
});

function searchRepositories() {
  const searchTerms = $("#searchTerms").val()
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`)
    .done(function(data) {
      const repoList = `${data.items.map(r => {
        return `
        <div>
          <h3><a href="${r.html_url}">${r.name}</a></h3>
          <p>
            <img src="${r.owner.avatar_url}" height="30px" width="30px">
            <a href="${r.owner.html_url}">${r.owner.login}</a>
          </p>
          <p>${r.description}</p>
          <p> - <a href="#" data-repository="${r.name}" data-owner="${r.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
          <hr>
        </div>`
      }).join('')}`

      $("#results").html(repoList)
    })
    .fail(function(error) {
      displayError()
    })
}

function showCommits(el) {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`)
    .done(function(data) {
      const commitList = `${data.map(c => {
        return `
        <ul>
          <li>
            <h4>${c.sha}</h4>
            <p>
              <img src="${c.author.avatar_url}" height="30px" width="30px">
              ${c.commit.author.name} (${c.author.login})
            </p>
          </li>
        </ul>`
      }).join('')}`

      $("#details").html(commitList)
    })
    .fail(function(error) {
      displayError()
    })
}

function displayError() {
  $("#errors").html("I'm sorry, there's been an error. Please try again.")
}
