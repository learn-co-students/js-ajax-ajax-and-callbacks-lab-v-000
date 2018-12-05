$(document).ready(function (){


});

function displayError() {
  document.getElementById('errors').innerHTML = "error";
}

function searchRepositories() {
  //debugger
  const term = document.getElementById('searchTerms').value
  //const req = new XMLHttpRequest();
  //req.addEventListener('load', showRepositories);
  var url = 'https://api.github.com/search/repositories?q=' + term
  $.get(url).done(function(data) {
      const repos = data.items
      const repoList = `<ul>${repos
        .map(r => '<li><a href=' + r.html_url + '>' + r.name + '-' + r.description + '</a>' +
        '<a href="#" data-repo="' + r.name + '" onclick="showCommits(this)">Get Commits</a></li>')
        .join('')}</ul>`;
      document.getElementById('results').innerHTML = repoList;
  });
  //debugger
  //req.open('GET', 'https://api.github.com/search/repositories?q=' + term);
  //req.send();
}

function showCommits (el) {
  //debugger
  const repo = el.dataset.repository;
  const owner = el.dataset.owner;
  var url = 'https://api.github.com/repos/' + owner + '/' + repo + '/commits'
  $.get(url).done(function(data) {
      const repos = data
      //debugger
      const repoList = `<ul>${repos
        .map(r => '<li><strong>' + r.sha + '-' + r.commit.author.name +'</strong><img src=' + r.author.avatar_url + ' height="32" width="32"></li>')
        .join('')}</ul>`;
      document.getElementById('details').innerHTML = repoList;
  });

}

// function showRepositories(event, data) {
//   const repos = JSON.parse(this.responseText).items;
//   debugger
//   const repoList = `<ul>${repos
//     .map(r => '<li><a href=' + r.html_url + '>' + r.name + '-' + r.description + '</a></li>')
//     .join('')}</ul>`;
//   document.getElementById('results').innerHTML = repoList;
//   //debugger
// }
