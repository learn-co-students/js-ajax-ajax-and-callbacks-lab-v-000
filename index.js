$(document).ready(function (){
		Handlebars.registerPartial("authorPartial", document.getElementById("author-partial-template").innerHTML);


});

function searchRepositories(){
		let searchTerm = $("#searchTerms")[0].value;
		let url = `https://api.github.com/search/repositories?q=${searchTerm}`
		$.get(url).done(function(data){
			showData(data);
		}).fail(function(error) {
	  	// This is called when an error occurs
	    document.getElementById("errors").innerHTML= "I'm sorry, there's been an error. Please try again. <details>" + error.responseText + "</details>";
  	});
	}

function showData(data){
	const repos = data.items;
	const src = document.getElementById("repos-template").innerHTML;
	const template = Handlebars.compile(src);
	const repoList = template(repos);
	document.getElementById("results").innerHTML = repoList;
}

function showDetails(data){
	const repos = data;
	const src = document.getElementById("details-template").innerHTML;
	const template = Handlebars.compile(src);
	const repoList = template(repos);
	document.getElementById("details").innerHTML = repoList;
	console.log(data);
}

function showCommits(url){

	let urlString = url + "/commits";
	$.get(urlString).done(function(data){
		showDetails(data);
	})
}

