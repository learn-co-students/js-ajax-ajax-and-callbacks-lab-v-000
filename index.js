// Look at how they solved it, with such different Javascript:

// var displayError = () => $('#errors').html("I'm sorry, there's been an error. Please try again.")
//
// var renderCommit = (commit) => {
//   return `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
// }
//
// var renderCommits = (data) => {
//   let result = data.map((commit)=>renderCommit(commit)).join('')
//   return `<ul>${result}</ul>`
// }
//
// var showCommits = (el) => {
//   $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
//     $('#details').html(renderCommits(data))
//   }).fail(error => {
//     displayError()
//   })
// }
//
// var renderSearchResult = (result) => {
//   return `
//       <div>
//         <h2><a href="${result.html_url}">${result.name}</a></h2>
//         <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
//         <p>${result.description}</p>
//       </div>
//       <hr>
//     `
// }
//
// var renderSearchResults = (data) => data.items.map( result => renderSearchResult(result))
//
// var searchRepositories = () => {
//   const searchTerms = $('#searchTerms').val()
//   $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
//       $('#results').html(renderSearchResults(data))
//     }).fail(error => {
//       displayError()
//     })
// }
//
// $(document).ready(function (){
// });

// Here's mine:
$(document).ready(function (){
});

function searchRepositories() {
  const searchTerms = document.getElementById("searchTerms").value;
  const searchURL = `https://api.github.com/search/repositories?q=${searchTerms}`;
  $.get(searchURL, function(data) {
    const resultsString = data.items.map(i => `<li>
      Name: ${i.name}<br>
      Description: ${i.description}<br>
      HTML URL: ${i.html_url}<br>
      Owner login:${i.owner.login}<br>
      Owner avatar: ${i.owner.avatar_url}<br>
      Owner's profile: ${i.owner.url}<br>
      <a href="#" data-repository="${i.name}" data-owner="${i.owner.login}" onclick="showCommits(this);">Show Commits</a>
      </li>`).join(``);
    $("#results").append(`<ul>${resultsString}</ul>`);
  }).done(function() {
    $("#results").prepend(`success!`);
  }).fail(function() {
    displayError();
  });
  // const xhr = new XMLHttpRequest();
  // xhr.addEventListener('load', showRepositories);
  // xhr.open('GET', searchURL);
  // xhr.send();
}

function showCommits(r) {
  const owner = r.dataset.owner;
  const repo = r.dataset.repository;
  const searchURL = `https://api.github.com/repos/${owner}/${repo}/commits`;
  $.get(searchURL, function(data) {
    const resultsString = data.map(c => `<li>
      SHA: ${c.sha}<br>
      Author: ${c.commit.author.name}<br>
      Message: ${c.commit.message}<br>
      </li>`).join(``);
    $("#details").append(`<ul>${resultsString}</ul>`);
  }).done(function() {
    $("#details").prepend(`success!`);
  }).fail(function() {
    displayError();
  });
}

function displayError() {
  $("#errors").append("I'm sorry, there's been an error. Please try again.");
}
