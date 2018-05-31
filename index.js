$(document).ready(function (){
});

function searchRepositories(){
  let searchTerms = $("#searchTerms").val();
  let url = `https://api.github.com/search/repositories?q=${searchTerms}`
  $.get(url, response => {
   renderResponse(response, "repo", "#results")
  }).fail(error => {
   displayError()
  }
 );
}

function renderResponse(response, item, html){
 console.log(item);
 console.log(response);
 console.log(html);
 if (item === "commits"){
  let results = response.map(response => `${makePretty(response,item)}`)
  $(`${html}`).html(results)
 }
 if (item === "repo"){
  let results = response.items.map(response => `${makePretty(response,item)}`)
  $(`${html}`).html(results)
  }
 }

function makePretty(response, item){
 if (item === "repo"){
   return `
        <h2><a href="${response.html_url}">${response.name}</a></h2>
        <p><a href="#" data-repository="${response.name}" data-owner="${response.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
        <p>${response.description}</p>
         `
  }
  
  if (item === "commits"){
   return `<li>SHA:<h3>${response.sha}</h3>
          <p>Commit Message: ${response.commit.message}</p>
          <p>Author: ${response.commit.author.name}</p>
          <p>Login: ${response.author.login}</p>
          <img src="${response.author.avatar_url}">
          </li>`
  }
}

 function displayError(){
  const errorsMessage = "I'm sorry, there's been an error. Please try again."
  $("#errors").html(errorsMessage)
 }


function showCommits(response){
 let url = `https://api.github.com/repos/${response.dataset.owner}/${response.dataset.repository}/commits`
 $.get(url, response => {
   renderResponse(response, "commits", "#details")
  }).fail(error => {
   displayError()
  }
 );
}
