$(document).ready(function (){
  
});

function searchRepositories(){
  const searchTerms = $('#searchTerms').val();
  const url = `https://api.github.com/search/repositories?q=${searchTerms}`;

  $.get(url).done(data => {
    const repoList = '<ul>' + data.items.map( r => {
      console.log(r)
      return (`
            <li>
              <h2><a href="${r.html_url}">${r.name}</a></h2>
              <p><img src="${r.owner.avatar_url}"></p>
              <p>by: <a href="https://github.com/${r.owner.login}">${r.owner.login}</a></p>
              <p><a href="#" data-repository="${r.name}" data-owner="${r.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
            </li>`
            );
    }).join('') + "</ul>";
            
    $("#results").html(repoList);
  }).fail(displayError);
}

function showCommits(el) {
  const name = el.dataset.repository;
  const username = el.dataset.owner;
  const url = 'https://api.github.com/repos/' + username + '/' + name + '/commits'
  
  $.get(url).done(data => {
    const commitList = '<ul>' + data.map(r => {
      return (`
            <li>
              <h2>SHA: ${r.sha}</h2>
              <p>${r.commit.message}</p>
              <p><img src="${r.author.avatar_url}"></p>
              <p>by: <a href="${r.author.html_url}">${r.author.login}</a></p>
            </li>`
            );
    }).join('') + "</ul>";
    
    $("#details").html(commitList);
  }).fail(displayError);
}

function displayError() {
  $("#errors").html("I'm sorry, there's been an error. Please try again.")
}