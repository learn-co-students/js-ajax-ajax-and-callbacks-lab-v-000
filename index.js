
function searchRepositories() {
	searchTerm = $('#searchTerms').val()
	let url = `https://api.github.com/search/repositories?q=${searchTerm}`
	let template = Handlebars.compile(document.getElementById("repos-template").innerHTML)

	$.get(url)

		.done(function(data) {
			$('#results').html(template(data.items));
		})

		.fail(displayError);
};

function showCommits(el) {
	const userName = el.dataset.owner
	const repoName = el.dataset.repository
	let url = `https://api.github.com/repos/${userName}/${repoName}/commits`

	let template = Handlebars.compile(document.getElementById("commits-template").innerHTML) 

	$.get(url)
		.done(function(data) {
			$('#details').html(template(data));
		})

		.fail(displayError);
};

function displayError() {
	$('#errors').html("There has been an error.")
};

$(document).ready(function (){

});


