const baseUrl = 'https://api.github.com/';
// https://api.github.com/search/repositories?q=batman


function searchRepositories() {
		$input = $('#searchTerms');
		showRepositories($input.val());
	}

function showRepositories(value) {
	$resultsDiv = $('#results');
	$.get(baseUrl + `search/repositories?q=${value}`, function(response) {
		const repoHTML = displayRepos(response);
		$resultsDiv.html(repoHTML);
	}).fail(error => {
		displayError();
	});
}

function showCommits(el) {
	const repo = el.dataset.repository;
	const owner = el.dataset.owner;

	$.get(baseUrl + `repos/${owner}/${repo}/commits`, function(response) {

		const commitHTML = displayCommits(response);
		$('#details').html(commitHTML);

	}).fail(error => {

		displayError();
	});
}

function displayCommits(response) {
	const commits = response;

	const commitList = "<ul>" + commits.map(c => {
		return(`
				<li>
					<section>
						<h4>SHA: ${c.sha}</h4>
						<h3>Author: ${c.commit.author.name}</h3>
						<p>Author Login: ${c.author === null ? 'not avaliable' : c.author.login}</p>
						<img src="${c.author.avatar_url}" width="32" height="32" />
					</section>
				</li>
			`)
	}).join('') + "</ul>";
	return commitList;
}

function displayRepos(response) {
	const repos = response.items;
	const repoList = "<ul>" + repos.map(r => {
		return(`
				<li>
					<section>
						<h4>Repository Name: ${r.name}</h4>
						<p>Description: ${r.description}</p>
						<a href="${r.html_url}">View Repo</a>
					</section>
					<h5>Repo Owner: ${r.owner.login}</h5>
					<img src="${r.owner.avatar_url}" width="32" height="32" />
					<a href="${r.owner.html_url}">View Profile</a>
					<a href="#" data-repository="${r.name}" data-owner="${r.owner.login}" onclick="showCommits(this);return false;">Show Commits</a>
				</li>
			`)
	}).join('') + "</ul>";
	return repoList;
}

function displayError() {
	const errorHTML = "<h2>I'm sorry, there's been an error. Please try again</h2>";
	$('#errors').html(errorHTML);
}

$(document).ready(function (){
});
