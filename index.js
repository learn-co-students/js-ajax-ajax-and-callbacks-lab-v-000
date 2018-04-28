$(document).ready(function (){

});

function searchRepositories(){
	const name = document.getElementsByName('searchTerms')[0].value;
	$.get(`https://api.github.com/search/repositories?q=${name}`)
	 .done(function(data) {
	 	// console.log("i'm succeeding");
		displayRepositories(data.items);
	})
	 .fail(function() {
	 	// console.log("i'm failing.")
	 	displayError();
	});
}

function displayRepositories(data) {
  // debugger;
  const repoList = `<ul>${data.map(r => '<li>' + r.name + ' - ' + r.description + ' - <a href="' + r.html_url + 
  	'">Link</a><br><a href="#" data-repository="' + r.name + '" data-owner="' + r.owner.login + '" onclick=getCommits(this)>Load Commits</a></li>')}</ul>`;
  document.getElementById("results").innerHTML = repoList;
}

function showCommits(repo){
	$.get(`https://api.github.com/repos/${repo.dataset.owner}/${repo.dataset.repository}/commits`)
	 .done(function(data) {
		renderCommits(data);
	});
}

function renderCommits(data){
  // const el = { dataset: { repository: "repo", owner: "owner" } }
  // const commits = data;
  const commitList = `<ul>${data.map(r => '<li>' + r.commit.tree.sha + ' - ' + r.commit.author.name + 
  	' - ' + r.committer.login + '<img src="' + r.committer.avatar_url + '"></li>')}</ul>`;
  document.getElementById("details").innerHTML = commitList;
}

function displayError() {
	$('#errors').html("<p>I'm sorry, there's been an error. Please try again.</p>");
}


// function getCommits(repo){
// 	$.get(`https://api.github.com/repos/${repo.dataset.owner}/${repo.dataset.repository}/commits`)
// 	 .done(function(data) {
// 		showCommits(data);
// 	});
// }

// function showCommits(data){
//   // const el = { dataset: { repository: "repo", owner: "owner" } }
//   // const commits = data;
//   const commitList = `<ul>${data.map(r => '<li>' + r.commit.tree.sha + ' - ' + r.commit.author.name + 
//   	' - ' + r.committer.login + '<img src="' + r.committer.avatar_url + '"></li>')}</ul>`;
//   document.getElementById("details").innerHTML = commitList;
// }