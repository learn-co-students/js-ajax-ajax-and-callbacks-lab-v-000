function searchRepositories(){
	const search = document.getElementById('searchTerms').value;
	$.get(`https://api.github.com/search/repositories?q=${search}`, displayRepositories).fail(displayError);
};

function displayRepositories(response){
	const data = response.items.map(function(item){
    return `<p>Name: <a href="${item.html_url}">${item.name}</a>
      - <a data-owner=${item.owner.login} data-repo=${item.full_name} href="#" onclick="showCommits();return false;">Show Commits</a></p>
      <p>Description: ${item.description}</p>
      <p>Owner: <img src="${item.owner.avatar_url}"> - <a href="${item.owner.html_url}">${item.owner.login}</a></p>`
	});
	$('#results').html(data);
};

function showCommits(el){
	$.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, displayCommits).fail(displayError);
};

function displayCommits(response) {
	let result = response.map(function(commit) {
		return `<p><h4>${commit.sha}</h4>
      	<p>${commit.commit.message}</p>
      	</p>`
      });
	$("#details").html(result);
};

function displayError(){
	$('#errors').html('There was an error. Please try again.');
};


$(document).ready(function (){
});