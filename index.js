$(document).ready(function (){


});

function searchRepositories() {
		let term = document.getElementById('searchTerms').value;
		$.get('https://api.github.com/search/repositories?q='+ term, function(response){
			$('#results').html(formatResults(response));
		}).fail(error => displayError());
		
	}	

function formatResults(data) {

	return data.items.map(d => 
		`<li><strong>${d.name}</strong><br>
		<a href="${d.url}">${d.url}</a><br>
		${d.description}<br>
		<a href="#" data-owner="${d.owner.login}" data-repository="${d.name}" onclick="showCommits(this)">Show Commits</a></li><br>`
		).join('');

}

function displayError() {
	$('#errors').html("Oops, there was an error! Try again.");
}

function showCommits(el) {
	debugger
	let owner = el.dataset.owner
	let repo = el.dataset.repository
	$.get(`https://api.github.com/repos/${owner}/${repo}/commits`, function(response) {
		$('#details').html(formatDetails(response));
	})
}

function formatDetails(data) {
	
	return data.map(d =>
			`<li>Login: <strong>${d.commit.author.name}</strong><br>
			<p>SHA: ${d.sha}</p><br>
			<img = src="${d.committer.avatar_url}"
			</li>`	
	).join('');

}
// display data.item.name,  data.item.url, data.item.description