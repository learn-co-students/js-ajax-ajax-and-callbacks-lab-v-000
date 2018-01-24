function displayError() {
  $("#errors").html("<p>I'm sorry, there's been an error. Please try again.</p>")
}

function showCommits(responseItems) {
  $.get(`http://api.github.com/repos/${responseItems.owner.login}/${responseItems.name}/commits`, function(response) {
    console.log(response);
    debugger
    $("#details").html(" ")
    $("#details").html(`<ul>${response.map(r => '<li>Sha: ' + r.sha + '<p>Author: ' + r.commit.author.name + `</p>  <p>Username: ` + `${r.author ? r.author.login : 'Unavailable'}` + '</p>' + `<img style=" width: 150px; height: 150px;" src="${r.author.avatar_url}" alt="avatar"> </li><br>`).join('')}</ul>`);
  })
}

function searchRepositories() {
  $.get(`https://api.github.com/search/repositories?q=${$("input[name~='searchTerms']").val()}`, function(response) {
    $("#results").html(" ")
    for (i = 0; i < response.items.length; i++) {
      that = response.items[i]
      console.log(response.items[i]);
      $("#results").append(`<h2>Repo Name: <a href="${response.items[i].html_url}">${response.items[i].name}</a></h2><br><img style=" width: 150px; height: 150px;" src="${response.items[i].owner.avatar_url}" alt="avatar"> <p>By: <a href="${response.items[0].owner.url}">${response.items[0].owner.login}</a></p> <a href="#" onclick="showCommits(that)">Show Commits</a>`);
    }
  }).fail(function(error) {
    displayError();
  })
}
