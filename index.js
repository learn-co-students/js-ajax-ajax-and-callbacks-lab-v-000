function displayError(){
  $('#errors').html("I'm sorry, there's been an error. Please try again.");
}

function searchRepositories(){
  let searchTerms = document.getElementById("searchTerms").value
  let url = `https://api.github.com/search/repositories?q=${searchTerms}`

  $.get(url, function(response){

    let repoArray = response.items;
    let repoList = repoArray.map(
      repo => `<li>
        <h2>Name:  <a href="${repo.html_url}">${repo.name}</a></h2>
        <p> Description: ${repo.description} </p>
        <p> <a href="#" onclick="showCommits(this);return false;" data-repository="${repo.name}" data-owner="${repo.owner.login}">Show Commits</a><p>
        <section>
            <img src="${repo.owner.avatar_url}" />
            Owner Name: <a href="${repo.owner.url}">${repo.owner.login}</a>
        </section>
      </li>`)


    $("div#results").html("<ul>" + repoList.join('') + "</ul>");
  }).fail(error => {
      displayError()
    });
}

function showCommits(repoDetails){
  let url = `https://api.github.com/repos/${repoDetails.dataset.owner}/${repoDetails.dataset.repository}/commits`;

  $.get(url, function(response){
    commits = response.map(commit => `<li>
      <h2>Author: <a href="${commit.author.html_url}">${commit.author.login}</a> </h2>
      <p> SHA: ${commit.sha} </p>
      <img src="${commit.author.avatar_url}" />
    </li>`).join('')

    $("div#details").html("<ul>" + commits + "</ul>");
  }).fail(error => {
      displayError()
    });
}
