$(document).ready(function (){

});

function displayError(){
  $("#errors").html("<p>I'm sorry, there's been an error. Please try again.</p>")
}

function showCommits(el){
  const user = el.dataset.owner
  const name = el.dataset.repository
  $.get(`https://api.github.com/repos/${user}/${name}/commits`)
  .done(function(data){
    console.log(data)
    $("#details").html(data.map(function(obj){
      return `<li>
        <p>${obj.sha}</p>
        <p>${obj.commit.author.name}</p>
        <p>${obj.author.login}</p>
        <img src="https://avatars1.githubusercontent.com/u/24859176?v=4" alt="Author's Avatar" height="50" width="50">
      </li>`
    }))
  })
}

function searchRepositories(){
  const searchTerms = document.getElementById("searchTerms").value
  $.get("https://api.github.com/search/repositories?q=" + searchTerms)
  .done(function(data){
    $("#results").html(data.items.map(function(obj){
      return `<li>
      <h3><a href="${obj.html_url}">${obj.name}</a></h3>
      <p>${obj.description}</p>
      <p><a href="${obj.owner.html_url}">${obj.owner.login}</a></p>
      <p><img src="${obj.owner.avatar_url}" alt="User Avatar" height="50" width="50"></p>
      <p><a href="#" data-repository="${obj.name}" data-owner="${obj.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
    </li>`
    }))
  })
  .fail(function(error){
    displayError()
  })
}
