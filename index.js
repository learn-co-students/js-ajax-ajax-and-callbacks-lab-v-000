$(document).ready(function (){
});

function displayError() { 
	$('#errors').html("I'm sorry, there's been an error. Please try again.")
}
function searchRepositories() {
	const searchTerms = $("#searchTerms")[0].value
	$.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
		$("#results").html(showRepositories(data))
	}).fail(error => {
		displayError()
	})
}

function showRepositories(repos) {
   var result = '<ul>' + repos.items.map(r => {
    return (`
           <li>
             <h2><a href="${r.html_url}">${r.name}</a></h2>
             <p>Description: ${r.description}</p>
          	<p><a href="${r.owner.url}">${r.owner.login}</a></p>
          	<img src="${r.owner.avatar_url}" height="32" width="32"> 
         	<p><a href="#" data-repository="${r.name}" data-owner="${r.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
           </li>`
           )
   }).join('') + "</ul>"
   return result
 }

function showCommits(el) {
   $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
     $("#details").html(displayCommits(data))
   }).fail(error => {
    displayError()
   })
}

function displayCommits(data) {
   let result = data.map((r)=>{
   return `<ul><li>
   		<h3>${r.sha}</h3><p>${r.commit.message}</p>
   		</li></ul>`
   }).join('')
   return result;
}


