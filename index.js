// https://api.github.com/search/repositories?q=tetris
const url = 'https://api.github.com/';

$(document).ready(function (){
});

function searchRepositories() {
  $input = $('#searchTerms').val();

  $.get(url + `search/repositories?q=${$input}`, response => {
    const repoHTML = displayRepositories(response);
    $("#results").html(repoHTML);
  }).fail(error => {
    displayError();
  });
};

function displayRepositories(response) {
  const repos = response.items;
  const repoList = "<ul>" + repos.map(r => {
    return(`
				    <li>
					    <section>
						     <h4>Repository Name: ${r.name}</h4>
						     <p>Description: ${r.description}</p>
						     <a href="${r.html_url}">View Repo</a>
					    </section>
					    <h5>Repo Owner: ${r.owner.login}</h5>
					    <img src="${r.owner.avatar_url}" width="32" height="32" /><br>
					    <a href="${r.owner.html_url}">View Profile</a><br>
					    <a href="#" data-repository="${r.name}" data-owner="${r.owner.login}" onclick="showCommits(this);return false;">Show Commits</a>
				    </li>
			    `)
        }).join('') + "</ul>";
        return repoList;
};

function showCommits(el) {
   $repository = el.dataset.repository;
   $owner = el.dataset.owner;

  $.get(url + `repos/${$owner}/${$repository}/commits`, response => {
    const commitsHTML = displayCommits(response);
    $("#details").html(commitsHTML);
  }).fail(error => {
    displayError();
  });
};

function displayCommits(commits) {
  const commitList = "<ul>" + commits.map(c => {
    return(`
      <li>
        <section>
           <img src="${c.author.avatar_url}" width="32" height="32" /><br>
           <h5>SHA: ${c.sha}</h5>
           <p>Author: ${c.commit.author.name}</p>
           <p>Author's Login: ${c.author.login}</p>
        </section>
      </li>
      `)
  }).join('') + "</ul>";
  return commitList;
};

function displayError() {
  const errorHTML = "<h2>I'm sorry, there's been an error. Please try again.</h2>";
  $("#errors").html(errorHTML);
};
