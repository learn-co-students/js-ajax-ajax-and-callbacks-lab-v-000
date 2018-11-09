
function displayError (){
  $('#errors').html('There is a error: ')
}

function searchRepositories (){
  const searchWord = $('#searchTerms').val()
  // console.log($('#results').html());
  $.get(`https://api.github.com/search/repositories?q=${searchWord}`,repositories => {
    $('#results').html(renderSearchResults(repositories) )

  } )
}

var renderSearchResults = (r) => {
  return r.items.map(rep => renderSearchResult(rep) );
}

var renderSearchResult = (r) => {
  return `
  <div>
   <h2><a href="${r.html_url}">${r.name}</a> </h2>
    <p>  <a href="${r.owner.html_url}">${r.owner.login}</a>  </p>
    <img src="${r.owner.avatar_url}" alt="">
    <p> ${r.description} </p>
    <a href="#" data-info="${r.commits_url}" data-repository="${r.name}" data-owner="${r.owner.login}"  onclick="showCommits(this)">Show Commits</a>
  </div>
    `;
  // );
}
//  For each commit, (list the SHA), the author, the author's login, and the author's avatar as an image
var renderCommits = (dataCommits) => {
  return  dataCommits.map(c => renderCommit(c))
}
var renderCommit = (c) => {
  return `
    <p>  ${c.sha}</p>
    <p>  ${c.commit.author.name}</p>
  `
}


var showCommits = (r) => {
  let urlCommits = `https://api.github.com/repos/${r.dataset.owner}/${r.dataset.repository}/commits`
  $.get(urlCommits, commitsList => {
    $("#details").html(renderCommits(commitsList) )
  }).fail(error => {
    displayError()
  })
}



$(document).ready(function (){
  searchRepositories()
});
