$(document).ready(function (){
    
});

function searchRepositories() {

var query = document.getElementById("searchTerms").value;
//console.log(query);
$.get( "https://api.github.com/search/repositories", { q: query } )
  .done(function( data ) {
    //const src = document.getElementById("repository-template").innerHTML
    //const template = Handlebars.compile(src)
    //const repoList = template(data.items)
    let repoList = '';
    
    for (let i=0; i < data.items.length; i++) {
      repoList += `<h2><a href="${data.items[i].html_url}">${data.items[i].full_name}</a></h2>
                    <p>${data.items[i].description}</p>
                    <p><a href="#" data-repository="${data.items[i].name}" data-owner="${data.items[i].owner.login}" onclick="javascript:showCommits(this)">Show Commit</a></p>
                    <section>
                      <header><h4>Created By ${data.items[i].owner.login}</h4></header>
                      <img src="${data.items[i].owner.avatar_url}" height="32" width="32">
                    </section>`
    }

    document.getElementById("results").innerHTML = repoList
  })
  .fail(function() {
    displayError();
  });
  
}

function displayError() {
    $( "#errors").html("I'm sorry, there's been an error. Please try again.");
}

function showCommits(el) {
     const repo = el.dataset.repository;
     const owner = el.dataset.owner
     console.log(el);
     $.get( `https://api.github.com/repos/${owner}/${repo}/commits` )
      .done(function( data ) {
        console.log(data)
        //const src = document.getElementById("commit-template").innerHTML
        //const template = Handlebars.compile(src)
        //const commitList = template(data)
        let commitList = "";
        
        for (let i=0; i < data.length; i++) {
          commitList += `<p><b>${data[i].sha}</b><br>${data[i].commit.message}<br>
          </p>`
        }
        //by ${data[i].author.login}<img src="${data[i].author.avatar_url}" height="32" width="32">
        
        document.getElementById("details").innerHTML = commitList
      })
      .fail(function() {
        displayError();
      });   
}

