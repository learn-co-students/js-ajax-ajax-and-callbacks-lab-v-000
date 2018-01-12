$(document).ready(function (){
});

function searchRepositories() {
  const term = document.getElementById("searchTerms").value;
  const uri = "https://api.github.com/search/repositories?q=" + term;
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", displayRepositories);
  xhr.open("GET", uri)
  xhr.send();
  return false;
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  const repoList = "<ul>" + repos.map(repo => {
    const dataUsername = 'data-username="' + repo.owner.login + '"'
    const dataRepoName = 'data-repository="' + repo.name + '"'
    return(`
      <li>
        <h2>${repo.name}</h2>
        <a href="${repo.html_url}">${repo.html_url}</a><br>
        <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
        <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
        </li>`
      )
  }).join('') + "</ul>";
  document.getElementById("repositories").innerHTML = repoList
}


/*Display the collection of repositories inside the results div.
Include repository name, description, and a link to the HTML URL.
Also include repository owner login, repository owner avatar as an image,
and a link to the owner's profile page.
Hint: Pay close attention to the structure of the search results!
Add a "Show Commits" link to each repository result that will call a
showCommits function that gets the repository's commits from the
GitHub API and display them in the details div.
For each commit, list the SHA, the author, the author's login,
and the author's avatar as an image.
Handle errors on each API call. If $.get fails,
call a function displayError and display
"I'm sorry, there's been an error. Please try again." in the errors div.
Hint: You can test your error callbacks by turning off Wi-Fi or temporarily changing the URL you use in the $.get request.*/
