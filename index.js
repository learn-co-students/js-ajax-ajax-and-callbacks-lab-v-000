$(document).ready(function(){
});
function searchRepositories() {
  let userinput = document.getElementById("searchTerms").value;

  $.get(`https://api.github.com/search/repositories?q=${userinput}`, function(data)  {
    let result = data.items.map(item => { return `
      <p>Name:${item.full_name}</a>
      <br>
      URL:<a href="${item.html_url}">URL</a>
      <br>
      Desription:${item.description}
      <br>
      <a href="#" onclick="showCommits()">Show Commit</a>
      <br>
      Owner:<img src="${item.owner.avatar_url}"> - <a href="${item.owner.html_uld}">${item.owner.login}</a></p>
      <br>

      `});
     $("#results").html(result);
  }).fail(displayError);
}

function showCommits(el) {
    $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`,displayCommits).fail(displayError);
    }

function displayCommits(response){
  let result = response.map(commit => {
    return `
    <p><h4>${commit.sha}</h4>
    <p>${commit.commit.message}</p>
    </p>
    `
  })
  $("#details").html(result);
}
function displayError(){
$("#errors").html("I'm sorry, there's been an error. Please try again." );
}
