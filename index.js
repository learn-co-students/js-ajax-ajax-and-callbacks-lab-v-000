$(document).ready(function (){
});

function searchRepositories() {
    const searchTerm = $('#searchTerms').val() 
    $.get(`https://api.github.com/search/repositories?q=${searchTerm}`, data => { $('#results').html(displayRepositories(data)) }).fail(error => { displayError() })
   // debugger
}

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}


function displayRepositories(data) {
    data.items.map( result => displayRepository(result))
}

function displayRepository(result) {
    //console.log(result.items)
    //debugger
     document.getElementById("results").innerHTML = `
         <div>
           <h2><a href="${result.html_url}">${result.name}</a></h2>
           <p><a href="#" data-repository="${result.name}" data-full_name=${result.full_name} data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
           <p>${result.description}</p>
           <p>${result.full_name}</p>
         </div>
         <hr>
       `
}

var renderSearchResults = (data) => data.items.map( result => renderSearchResult(result))

function showCommits(el) {
    console.log(el.dataset.full_name)
   // debugger
    $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
    $('#details').html(displayCommits(data))
  }).fail(error => {
    displayError()
  })
   // debugger
}
/*
	var showCommits = (el) => {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
    $('#details').html(renderCommits(data))
  }).fail(error => {
    displayError()
  })
}
*/

function displayCommits(data) {
    let result = data.map((commit) => displayCommit(commit)).join('')
    return `<ul>${result}</ul>`

}

function displayCommit(commit) {
    return `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
}

/*
	var renderCommit = (commit) => {
  return `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
}

var renderCommits = (data) => {
  let result = data.map((commit)=>renderCommit(commit)).join('')
  return `<ul>${result}</ul>`
}



*/