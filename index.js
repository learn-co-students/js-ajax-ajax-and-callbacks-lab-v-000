function searchRepositories(event) {
  $(document).ready(function() {
    let terms = document.getElementById("searchTerms").value
    $.get(`https://api.github.com/search/repositories?q=${terms}`, function(response) {
      displayResults(response);
    }).fail(function(error) {
      displayError();
    });
  });
}

function displayResults(data) {
  const display = data.items[0]
  const src = document.getElementById("display-template").innerHTML
  const template = Handlebars.compile(src)
  const repoDisplay = template(display)
  document.getElementById("results").innerHTML += repoDisplay
  document.getElementById("results").innerHTML += '<a href="#" onclick="getCommits(' + `'${ data.items[0].url }'` + ')">Get commits</a>'
}

function displayError() {
  document.getElementById("errors").innerHTML = "I'm sorry, there's been an error. Please try again."
}

function getCommits(url) {
  $(document).ready(function () {
    $.get(`${url}/commits`, function(response) {
      showCommits(response);
    }).fail(function(error) {
      displayError();
    });
  });
}

function showCommits(commits) {
  let commitData = `<ul>${commits.map(commit => '<li><strong>' + commit.sha + "<br>" + commit.commit.author.name + " - " + commit.author.login +
  '</strong><br>' + "<br>" + `<img src=${commit.author.avatar_url} width="100px">` + "<br><br>" + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitData
}
