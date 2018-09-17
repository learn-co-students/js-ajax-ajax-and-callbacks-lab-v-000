
$(document).ready(function (){
});


  function displayError() {
    $('#errors').html("I'm sorry, there's been an error. Please try again.")
  }

  function displayResponse(response) {
    let result = response.items.map(repo => {
		return `
			<li>
			<h3><a href="${repo.html_url}">${repo.name}</a></h3>
			<p><a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}"
			onclick="showCommits(this);return false;">Show Commits</a></p>
			<p>${repo.description}</p>
			</li>
			`
    })
    $('#results').html(result);

  }

  function showCommits(el) {
  	const repoName = el.dataset.repository;
  	const owner = el.dataset.owner;
  	$.get(`https://api.github.com/repos/${owner}/${repoName}/commits`,
  		function(response) {
  			$('#details').html(displayCommits(response));
  		}).fail(displayError)
  	}

    function displayCommits(result) {
    	const commitList = "<ul>" + result.map(commit => {
    		return `
    			<li>
    			<h3>SHA: ${commit.sha}</h3>
    			<h2>Author: ${commit.commit.author.name}</h2>
    			<p>Author Login: ${commit.committer.login }</p>
    			<img src="${commit.committer.avatar_url}" height=50px width = 50px />
    			</li>
    			`
    	}).join('') + "</ul>";
    	return commitList;
   }


  function searchRepositories() {
      let search = document.getElementById("searchTerms").value;

      $.get(`https://api.github.com/search/repositories?q=${search}`, displayResponse).fail(displayError)
  }
