

var searchRepositories = () => {
  const searchWord = $('#searchTerms').val()
  // console.log($('#results').html());
  $.get(`https://api.github.com/search/repositories?q=${searchWord}`,repositories => {
    $('#results').html(renderSearchResults(repositories) )

  } )
}

var renderSearchResults = (r) => { r.items.map(rep => renderSearchResult(rep) ) }.fail(function(error) {
    // This is called when an error occurs
    console.log('Something went wrong ari: ' + error.statusText);
});


var renderSearchResult = (r) => {
  // return data.items.map( r => `
  return `
  <div>
   <h2><a href="${r.html_url}">${r.name}</a> </h2>
    <p>  <a href="${r.owner.html_url}">${r.owner.login}</a>  </p>
    <img src="${r.owner.avatar_url}" alt="">
    <p> ${r.description} </p>
    <a onclick="${showCommits(this)}">Show Commits</a>
  </div>
    `;
  // );
}
//  For each commit, (list the SHA), the author, the author's login, and the author's avatar as an image
var renderCommits = (dataCommits) => {
//   // dataCommits
//   dataCommits.map(c => {`
//     <p>  ${c.sha}</p>
//     <p>  ${c.commit.author.name}</p>
//   `})
// debugger
}
// r.commits_url
// "https://api.github.com/repos/dankerizer/searchterms-tagging-2/commits{/sha}"
var showCommits = (r) => {
  let commits = r.commits_url
  // debugger
  commits = commits.replace(/commits.+/,"commits")
  $.get(commits, commitsList => {
    $("#details").html(renderCommits(commitsList) )
  })

  // $.get(commits_url)
}


var displayError = () => {
  $('#errors').html('There is a error: ')
}

$(document).ready(function (){
  // searchRepositories()
  // showCommits()
});
