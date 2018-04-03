function searchRepositories() {
  const searchTerms = document.getElementById("searchTerms").value;
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(response) {
    const repos = response.items;
    const repoList = '<ul>' + repos.map(
        r => {
          return (`
            <li>
              <p>${r.name}<br>
              - ${r.description}<br>
              - ${r.owner.login}<br>
              - <img src="${r.owner.avatar_url}" width ="32" height="32"><br>
              - <a href="${r.html_url}" target="_blank">${r.html_url}</a><br>
              - <a href="#" data-owner="${r.owner.login}" data-repository="${r.name}" onclick="showCommits(this)">Get Commits</a></p>
            </li>
          `);
        }
      ).join('') + '</ul>';
    $("#results").html(repoList);
  }).fail(function(error) {
    displayError();
  });
}

function displayError() {
  document.getElementById("errors").innerHTML += "I'm sorry, there's been an error.";
}

function showCommits(el) {
  const repo = el.dataset.repository;
  const owner = el.dataset.owner;
  $.get(`https://api.github.com/repos/${owner}/${repo}/commits`, function(response) {
    const commitList = '<ul>' + response.map(
      r => {
      //  console.log(r)
        return (`
          <li>

            <p>${r.commit.author.name}<br>
            - ${r.author ? r.author.login : ""}<br>
            - ${r.author ? '<img src="' + r.author.avatar_url + '" width="32" height="32">' : ""}<br>
            - ${r.sha}</p>
          </li>
        `);
      }
    ).join('') + '</ul>';
    $("#details").html(commitList);
  });
}

$(document).ready(function() {
});
