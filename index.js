$(document).ready(function (){
});


function searchRepositories() {
  var searchTerms = $("#searchTerms").val();

  $.get('https://api.github.com/search/repositories?q=' + searchTerms, function(data) {
  	$("#results").html(`<ul>${data.items.map(r => `<li><h2><a href="${r.html_url}">${r.name}</a></h2>
  		<p>Description: ${r.description}</p><p>Owner: <a href="${r.owner.html_url}">${r.owner.login}</a></p>
  		<img src="${r.owner.avatar_url}" height="32" width="32"><p><a href="#" data-repository="${r.name}" 
		data-owner="${r.owner.login}" onclick="showCommits(this)">Show Commits</a></p></li>`).join('')}</ul>`);
  		})
  		.fail(displayError());
}

function showCommits(repo) {
	var owner = repo.dataset.owner;
	var name = repo.dataset.repository;

	$.get(`https://api.github.com/repos/${owner}/${name}/commits`, function (data) {
		$("#details").html(`<ul>${data.map(c => `<li><p>SHA: ${c.sha}</p><p>Author: 
			${c.commit.author.name}</p></li>`).join('')}</ul>`);
	})
		.fail(displayError());
}

function displayError() {
	$("#errors").html("I'm sorry, there's been an error. Please try again.")
}