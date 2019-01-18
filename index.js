$(document).ready(function (){
});


function searchRepositories(){
	const nameValue = document.getElementById("searchTerms").value;
	const url = `https://api.github.com/users/${nameValue}/repos`
	$.get(url, function(data) {
		displayRepositories(data);
	}).fail(function(error) {
		displayError();
	});
}

function displayRepositories(data){
	const userInfo = 
		`<h3>User: <a href="${data[0].owner.html_url}"">${data[0].owner.login}</a></h3>
		<img src="${data[0].owner.avatar_url}" width="10%" height="10%">`
	const repoList = data.map( r =>
		`<li><a href="${r.html_url}" target="_blank">${r.name}</a></li>
		<ul><li>${r.description}</li>
		<li><a href="#" data-repo="${r.name}" data-username="${r.owner.login}" onclick="showCommits(this)">Show Commits</a></li></ul>`
		).join('');
	const returnHTML = userInfo + '<ul>' + repoList + '</ul>'
	document.getElementById('results').innerHTML = returnHTML 
}

function showCommits(element){
	const repoName = element.dataset.repo;
	const username = element.dataset.username
	const url = `https://api.github.com/repos/${username}/${repoName}/commits`
	$.get(url, function(data) {
		displayCommits(data);
	});
}

function displayCommits(data){
	const commitInfo = data.map( r =>
		`<li>SHA: ${r.sha}</li>
		<img src="${r.author.avatar_url}" height="3%" width="3%">
		${r.commit.author.name} - ${r.author.login}`
		).join('');
	const returnHTML = '<ul>' + commitInfo + '</ul>'
	document.getElementById('details').innerHTML = returnHTML
}	

function displayError(){
	const errorText = "I'm sorry, there's been an error. Please try again."
	document.getElementById('errors').innerHTML = errorText
}
