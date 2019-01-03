$(document).ready(function (){
});

function searchRepositories() {
	const searchTerms = document.getElementById('searchTerms').value
	$.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(data) {
        $("#results").html(showRepositories(data));
	});
}

function showRepositories(data) {
  const repoList =
    '<ul>' +
    data.items
      .map(r => {
        return `
          <li>
          	<a href=${r.html_url}>${r.name}</a>
            <p>Description: ${r.description}</p>
            <p>Owner: <a href=${r.owner.url}>${r.owner.login}</a></p>
	    	<img src= ${r.owner.avatar_url} height="32" width="32">
          	<a href="#" data-repository="${r.name}" data-owner="${r.owner.login}" onclick="showCommits(this)">Show Commits</a>
          </li>`;
      })
      .join('') +
    '</ul>';
  document.getElementById('results').innerHTML = repoList;
 }

function showCommits(el) {
	const owner = el.dataset.owner;
	const repo = el.dataset.repository;
	$.get(`https://api.github.com/repos/${owner}/${repo}/commits`).done(function(data) {
    	$('#details').html(renderCommits(data));
   	  }).fail(function(error) {
     	displayError(error);
	});
}

function renderCommits(data) {
	 const commitList =
    '<ul>' +
    data
      .map(commit => {
        return `
          <li>
          	<p>SHA: ${commit.sha}</p>
		    <p>Author: ${commit.commit.author.name}</p>
		    <p>Login: ${commit.author.login}</p>
		    <img src= ${commit.author.avatar_url} height="32" width="32">
          </li>`;
      })
      .join('') +
    '</ul>';
  	document.getElementById('details').innerHTML = commitList;
}

function displayError(error) {
  $('#errors').html("I'm sorry, there's been an error, please try again.");
}