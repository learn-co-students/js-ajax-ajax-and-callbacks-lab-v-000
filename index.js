(document).ready(function (){

});

function displayError(){
  $("#errors").html("error")
}

function searchRepositories(){
  // https://api.github.com/search/repositories?q=tetris
  const search_term = $("#searchTerms").val()
  $.get("https://api.github.com/search/repositories?q=" + search_term, (response) => {
    var output = []
    response.items.forEach((result) => {
      output.push(`<li><a href=${result.html_url}>${result.name} - ${result.description}</a> - <a href="#" data-owner="${result.owner.login}" data-repository="${result.name}" onclick="showCommits(this)">see commits</a></li>`)
    });
    $('#results').html("<ul>" + output.join("") + "</ul>")
  }).fail((error) => {
    // This is called when an error occurs
    console.log('Something went wrong: ' + error);
    displayError();
  });
}

function showCommits(element){
  $.get(`https://api.github.com/repos/${element.dataset.owner}/${element.dataset.repository}/commits`, (response) => {
    var output = []
    response.forEach((commit) => {
      commit.author ? author = commit.author : author = {avatar_url: "", login: "N/A"}
      output.push(`<li><p>${commit.sha}</p><p><img src="${author.avatar_url}" height="25"/> ${author.login}</p></li>`)
    });
    $('#details').html("<ul>" + output.join("") + "</ul>")
  });
}
