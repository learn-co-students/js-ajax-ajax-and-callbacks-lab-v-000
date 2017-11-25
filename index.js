function searchRepositories(){
  let searchTerms = $("#searchTerms").val();
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
    $("#results").html(searchResults(data))
    debugger
  }).fail(errorMsg => {
    displayError()
  })
}

function displayError(){
  $("#errors").html("<div style='color: red'>I'm sorry, there's been an error. Please try again.</div>")
}

function searchResults(data){
  return data.items.map(item => stringifyRepo(item))
}

function stringifyRepo(item){
  //HTML template
  return `
      <div>
        <h3><a href="${item.html_url}">${item.name}</a></h3>
        <p><a href="#" data-repository="${item.name}" data-owner="${item.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
        <p>${item.description}</p>
      </div>`
}

function showCommits(element){
  $.get(`https://api.github.com/repos/${element.dataset.owner}/${element.dataset.repository}/commits`, req =>{
    $("#details").html(commitsResults(req))
  }).fail(errorMsg => {
    displayError();
  })
}

function commitsResults(item){
    let commitResult = item.map((commit) => stringifyCommit(commit)).join('')
    return `<ul>${commitResult}</ul>`
}

function stringifyCommit(commit){
  debugger
  return `<li><h4>${commit.sha}</h4><p>${commit.commit.message}</p></li>`
}




$(document).ready(function (){
});

//or: $(function(){});

//or: jQuery(document).ready(function($){});
