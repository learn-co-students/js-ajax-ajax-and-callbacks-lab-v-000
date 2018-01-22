$(document).ready(function (){
	
});

function displayError(error) {
	$('#errors').html("<p>I'm sorry, there's been an error. Please try again.</p>")
}

function commitsResponseInHTML(response) {
	let html = "<ul>";
  html +=	Array.from(response).map(function(commit){
  	return `<li>
  						<b>sha: </b>${commit.sha}.
  						<b>Name: </b>${commit.commit.author.name}.  
  						<b>Login: </b>${commit.author.login} <br>
  						<img src=${commit.author.avatar_url} width="50px">
  					</li>`
  }).join('') + "</ul>";
  return html
}

function reposResponseInHTML(response) {
	let html = "<ul>";
  html +=	Array.from(response.items).map(function(repo){
  	return `<li>
  						<b>Name: </b>${repo.name}. 
  						<b>Description: </b>${repo.description} <br>
  						<a href=${repo.html_url}>Link to HTML Url</a> <br>
  						<a href=${repo.owner.url}>${repo.owner.login}</a> <br>
  						<img src=${repo.owner.avatar_url} width="50px">
  						<a href="#" data-owner=${repo.owner.login} data-repository=${repo.name} onclick="showCommits(this)">Commits</a>
  					</li>`
  }).join('') + "</ul>";
  return html
}


function showCommits(el) {
	let owner = el.dataset.owner,
			repo = el.dataset.repository;
	$.get("https://api.github.com/repos/" + owner + "/" + repo + "/commits", function(response){
		let html = commitsResponseInHTML(response);
		$('#details').html(html)
	}).fail(function(error){
		displayError(error);
	});
}

function searchRepositories() {
	let keywords = $('#searchTerms').val().split(" ");
	let searchVal = "https://api.github.com/search/repositories?q=" + keywords.join('+');

	$.get(searchVal, function(response){
		let html = reposResponseInHTML(response);
		$('#results').html(html)
	}).fail(function(error){
		displayError(error);
	});
}

