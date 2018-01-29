document.addEventListener("DOMContentLoaded", function(event) {
  Handlebars.registerPartial("authorPartial", document.getElementById("author-partial-template").innerHTML)
});


function searchRepositories() {
	const searchTerms = document.getElementById('searchTerms').value;
	const url = 'https://api.github.com/search/repositories?q=' +  searchTerms
  // return url
  $.get(url, function(data) {
    // const repos = data.items
    // const src = document.getElementById("repository-template").innerHTML
    // const template = Handlebars.compile(src)
    // const repoList = template(repos)
    // $("#results").html(repoList);
    console.log(data.items);
    // const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="' + r.html_url + '" + >Repo</a>- <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getCommits(this)">Get Commits</a> - <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getBranches(this)">Get Branches</a></li>').join( ' ')}</ul>`


    //this works too, but handlebars is more efficient
      results = data.items
     $.each(results, function() {
            console.log(this.name);
            $("#results")
              .append("Name: " + this.name)
              .append("Url: " + this.html_url)
              .append('"<a href="#" data-repository="' + this.name + '" data-owner="' + this.owner.login + '" onclick="showCommits(this)">Get Commits</a>"');
        });
  }).fail(function(error) {
  // This is called when an error occurs
    displayError();
  });
}

// this way works better, but the tests require me to be more messy
// function getCommits(el) {
//   const username = el.dataset.username
//   const name = el.dataset.repository
//   const req = new XMLHttpRequest()
//   req.addEventListener("load", showCommits)
//   req.open("GET", 'https://api.github.com/repos/' + username + '/' + name + '/commits')
//   req.send()
// }
// function showCommits() {
//   const commits = JSON.parse(this.responseText)
//   const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + '<strong>' + commit.commit.author.name + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
//   document.getElementById("details").innerHTML = commitsList
// }

function showCommits(el) {
  const username = el.dataset.owner
  const name = el.dataset.repository
  const url = 'https://api.github.com/repos/' + username + '/' + name + '/commits'
  $.get(url, function(data) {
    $.each(data, function() {
      console.log(this);
      $("#details")
        .append("Commit: " + this.sha);
    })
  });
}

function displayError() {
  $("#errors").html("I'm sorry, there's been an error. Please try again.");
};