var displayError = function() {
	return $('#errors').html("I'm sorry, there's been an error. Please try again.")
};

var searchRepositories = function() {
	const searchTerms = $('#searchTerms').val()
	$.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(results){
			$('#results').html(searchResults(results))
	}).fail(function(error) {
		displayError()
	})
};

var searchResults = function(results) {
   const resultList = results.items.map(function (result){
  	return `
  	<div>
  		<h4><a href="test">${result.name}</a><h4>
  		<p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick = "showCommits(this)"> Show Commits</a></p>
  		<p>${result.description}</p>
  		</div>
  	`
  })
   return resultList;
};

var showCommits = function(commit) {
	$.get(`https://api.github.com/repos/${commit.dataset.owner}/${commit.dataset.repository}/commits`, function(results){
		$('#details').html(listCommits(results))
	}).fail(function(error){
		displayError()
	});
};

var listCommits = function(results){
	const commitList = results.map (function(commit){
		return `
			<ul>
				<li> ${commit.sha}</li>
				<li> ${commit.commit.message} </li>
				</ul>
				`
	})
	return commitList;
};
