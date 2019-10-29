$(document).ready(function (){
});

function searchRepositories() {
  const searchTerms = $('#searchTerms').val();
  const rootUri = "https://api.github.com/search/repositories?q="
  
  $.get(rootUri + searchTerms, function(data) {
  })
  .done(function(data) {
    showRepositories(data);
  })
  .fail(function(error){
    displayError();
  });
}


function showRepositories(data) {
  const repos = data.items;
  const repoList = '<ul>' + repos.map(r => {
    return (`
            <li>
              <h2><a href="${r.html_url}">${r.name}</a></h2>
                <section>
                  <header><h4>Created by: <a href="${r.html_url}">${r.owner.login}</a></h4></header>
                  <img src="${r.owner.avatar_url}" height="32" width="32">
                </section>
                <footer>
                  <a name="commit-link" href="#" data-repository="${r.name}" data-owner="${r.owner.login}" onclick="showCommits(this);">Show Commits</a>
                </footer>
            </li>`
           )
   }).join('') + "</ul>"
  document.getElementById('results').innerHTML = repoList;
}

function showCommits(el) {
  const repository = `${el.dataset.owner}/${el.dataset.repository}`;
  $.get(`https://api.github.com/repos/${repository}/commits`, function(data) {
  })
  .done(function(data) {
    renderCommits(data);
  })
  .fail(function(error) {
    displayError();
  });
}

function renderCommits(data) {
  const commits = data;
  const commitList = '<ul>' + commits.map(c => {
    return (`  <li>
                  <article>
                    <p>${c.sha}</p>
                    <section>
                      <header><h4>Created by: <a href="${c.html_url}">${c.author.login}</a></h4></header>
                      <img src="${c.author.avatar_url}" height="32" width="32">
                    </section>
                  </article>
                </li>
            `)
   }).join('') + "</ul>"
  document.getElementById('details').innerHTML = commitList;
}

function displayError() {
  $('#errors').append("<strong>I'm sorry, there's been an error. Please try again.</strong>");
}
