$(document).ready(function (){
    
});

function searchRepositories() {
   let repoName = document.getElementById('searchTerms').value;
   const req = new XMLHttpRequest();
   req.addEventListener("load", showRepositories);
   req.open("GET", 'https://api.github.com/search/repositories?q=' + repoName);
   req.send()
}

function showRepositories(event, data) {
    const repos = JSON.parse(this.responseText);
    const repoList = '<ul>' + repos.items.map(r => {
        return (`
          <li>
            <h3><a href="${r.html_url}">${r.name}</a></h3>
            <p>Description: ${r.description}</p>
            <p><img src="${r.owner.avatar_url}" width="50" height="50"> Owner: ${r.owner.login}  </p>
            <a href="${r.owner.html_url}">Link to profile page </a>
            <a href="#" onclick="getCommits(this)" data-repository = "${r.name}" data-owner = "${r.owner.login}"> Show commits</a>
          </li>`
        )
    }).join('') + "</ul>"
    document.getElementById("results").innerHTML = repoList
}

function showCommits(el) {
    const repository = el.dataset.repository;
    const owner = el.dataset.owner;
    const req = new XMLHttpRequest();
    req.addEventListener("load", displayCommits);
    req.open("GET", 'https://api.github.com/repos/' + owner + '/' + repository + '/commits');
    req.send()
}

function displayCommits(event, data) {
    const commits = JSON.parse(this.responseText);
    const commitsList = '<ul>' + commits.map(r => {
        return (`
          <li>
            <p>SHA: ${r.sha}</p>
            <p><img src="${r.author.avatar_url}" width="50" height="50"> Owner: ${r.author.login}  </p>
          </li>`
        )
    }).join('') + "</ul>"
    document.getElementById("details").innerHTML = commitsList
}

function displayError() {
    document.getElementById("errors").innerHTML = "errors"

}