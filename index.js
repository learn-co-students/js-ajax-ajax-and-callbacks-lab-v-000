function formatRepos(data) {
	return data.items.map(i => 
	`Name: ${i.name} <br>
	Description: ${i.description} <br>
	HTML: ${i.html_url} <br>
	Owner Login: ${i.owner.login} <br>
	Image: ${i.owner.avatar_url} <br>
	Owner Profile HTML: ${i.owner.html_url} <br>
	 <a href="#" onclick="showCommits()">Show Commits</a>`);
}

function formatCommits(data) {
	debugger;
	return data.map(i => 
	`SHA: ${i.sha} <br>
	Author: ${i.author.name} <br>
	Author's Login: ${i.author.login} <br>
	Author Image: ${i.author.avatar_url} <br>`);
}

function searchRepositories() {
	const searchWord = document.getElementById("searchTerms").value;
	let url = `https://api.github.com/search/repositories?q=${searchWord}`;
	$.get(url, function(data) {
		$('#results').html(formatRepos(data));
	}).fail(function(error) {
	    displayError();
	});
};


function displayError() {
	const error = "I'm sorry, there's been an error. Please try again ";
	document.getElementById("errors").innerHTML = error;
}


function showCommits(el) {
	let url = `https://api.github.com/repos/owner/repo/commits`;
	$.get(url, function(data) {
		$('#details').html(formatCommits(data));
	}).fail(function(error) {
	    displayError();
	});
};

