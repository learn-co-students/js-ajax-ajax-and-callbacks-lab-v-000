
function searchRepositories(){
  let name = $('#searchTerms').val()

  $.ajax({
    url: `https://api.github.com/search/repositories?q=${name}`,
    type: "GET"
  })

  .done(showRepositories)
  .fail(displayError)
}

function showRepositories(data){
  let repos = data.items;
  let repoList = '<ul>' + repos.map(r =>
    `<li>
     <h3><strong>Name: <a href="${r.html_url}">${r.name}</a></strong><h3>
     <img src="${r.owner.avatar_url}" style="height: 100px; width: 100px;"/>
     <p>Profile: <a href="${r.owner.url}">${r.owner.url}</a>
     <p>Description: ${r.description}</p>
     <p>Commits: <a href="#" onclick="showCommits(this)" data-repository="${r.name}" data-owner="${r.owner.login}">Show Commits</a>
     </li>
    `).join('') + '</ul>';
    $('#results').html(repoList)
}

function showCommits(el){
  $.ajax({
    url: `https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`,
    type: "GET"
  })

  .done(displayCommits)
  .fail(displayError)
}

function displayCommits(data){
  data.forEach(function(commit) {
    console.log(commit);
    $("#details").append(
      `<div>
        <p>${commit.author.login}</p>
        <img src="${commit.author.avatar_url}" style="height: 30px; width: 30px;">
        <p>${commit.sha}</p>
      </div>`
    )
  })
}

function displayError(){
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

//{
  //if(c["author"] != undefined){
  //  console.log(c.author.login)
  //}
//}
$(document).ready(function (){
});
