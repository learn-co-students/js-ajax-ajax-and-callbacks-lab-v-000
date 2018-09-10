function searchRepositories() {
	const searchTerms = $('#searchTerms').val();
	$.get(`https://api.github.com/search/repositories?q=${searchTerms}`, 
		function(data) {
		$('#results').html(displayRepositories(data));
	}).fail(error => {
		displayError()
	});
}

function showCommits(el) {
	const repoName = el.dataset.repository;
	const owner = el.dataset.owner;
	$.get(`https://api.github.com/repos/${owner}/${repoName}/commits`,
		function(data) {
			$('#details').html(displayCommits(data));
		}).fail(error => {
			displayError()
		});
	}

function displayRepositories(result) {
	const repos = result.items;
	const repoList = "<ul" + repos.map(repo => {
		return (`
			<li>
			<h3><a href="${repo.html_url}">${repo.name}</a></h3>
			<p><a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}"
			onclick="getCommits(this)">Show Commits</a></p>
			<p>${repo.description}</p>
			</li>
			`)
	}).join('') + "</ul>";
	return repoList;
 }


  function displayCommits(result) {
  	const commitList = "<ul>" + result.map(commit => {
  		return (`
  			<li> 
  			<h3>SHA: ${commit.sha}</h3>
  			<h2>Author: ${commit.commit.author.name}</h2>
  			<p>Author Login: ${commit.author === null ? 'no info' : commit.author.login }</p>
  			<img src="${commit.author.avatar_url}" height=50px width = 50px />
  			</li>
  			`)
  	}).join('') + "</ul>";
  	return commitList;
 }


function displayError() {
	const errorHTML = "<h3>I'm sorry, there's been an error. Please try again.</h3>";
	$('#errors').html(errorHTML);
}


$(document).ready(function (){
});