function displayError() {
  $("#errors").html("<p>I'm sorry, there's been an error. Please try again.</p>")
}

function showCommits(responseItems) {
  $.get(`http://api.github.com/repos/${responseItems.owner.login}/${responseItems.name}/commits`, function(response) {
    $("#details").html(`<ul>${response.map(r => '<li>Sha: ' + r.sha + '<p>Author: ' + r.commit.author.name + `</p>  <p>Username: ` + `${r.author ? r.author.login : 'Unavailable'}` + '</p>' + `<img style=" width: 150px; height: 150px;" src="${r.author.avatar_url}" alt="avatar"> </li><br>`).join('')}</ul>`);
  }).fail(function(error) {
    displayError();
  })
}

function showRepository(data) {
  that = data
  $("#results").append(`<h2>Repo Name: <a href="${data.html_url}">${data.name}</a></h2><br><img style=" width: 150px; height: 150px;" src="${data.owner.avatar_url}" alt="avatar"> <p>By: <a href="${data.owner.url}">${data.owner.login}</a></p> <a href="#" onclick="showCommits(that)">Show Commits</a>`);
}

function searchRepositories() {
  $.get(`https://api.github.com/search/repositories?q=${$("input[name~='searchTerms']").val()}`, function(response) {
    $("#results").html(" ")
    for (i = 0; i < response.items.length; i++) {
      showRepository(response.items[i])
    }
  }).fail(function(error) {
    displayError();
  })
}
