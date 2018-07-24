$(document).ready(function (){
});

function searchRepositories() {
	var searchTerm = document.getElementById("searchTerms").value
	$.get(`https://api.github.com/search/repositories?q=${searchTerm}`, function(response) {
		const repoList = `${response.items.map(r => showRepositories(r)).join("")}`
		document.getElementById("results").innerHTML = repoList;
	}).fail(displayError())
}

function showRepositories(r) {
	return `<div>
						<h3><a href="${r.html_url}" target="_blank">${r.name}</a></h3>
						<p>Description: ${r.description}</p>
						<img src="${r.owner["avatar_url"]}" width='50' height='50'>
						<p>Owner: <a href="${r.owner["html_url"]}">${r.owner["login"]}</a></p>
						<a href="#" onclick="showCommits(this)" data-owner="${r.owner["login"]}" data-repository="${r.name}">Show Commits</a>
					</div>`
}

function showCommits(el) {
	const owner = el.dataset.owner
	const repo = el.dataset.repository
	console.log("Owner: ", owner)
	console.log("Repo: ", repo)
	$.get(`https://api.github.com/repos/${owner}/${repo}/commits`, function(response) {
		const commitsList = `${response.map(c => displayCommits(c)).join("")}`
		document.getElementById("details").innerHTML = commitsList
	}).fail(displayError())
}

function displayCommits(el) {

	return `<div>
						<h3>${el.sha}</h3>
						<img src="${el.author.avatar_url}" width="50" height="50"><p>Author: ${el.author.login}</p>
						
						<p>${el.commit.message}</p>
					</div>`
}

function displayError() {
	var error =  `<div>
									<p>I'm sorry, there's been an error. Please try again.</p>
								</div>`
	document.getElementById("errors").innerHTML = error
}