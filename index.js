$(document).ready(function (){
});

function searchRepositories(){
  let req = new XMLHttpRequest();
  let params = document.getElementById('searchTerms').value.split(" ").join("+");
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/search/repositories?q=${params}`);
  req.send();
}

function displayRepositories(){
  let results = JSON.parse(this.responseText).items;
  console.log(results);
  const resultList = `<ul>${results.map(r =>
    '<li>' + r.name + '<br>' +
    r.description + '<br>' +
    '<a href="' + r.html_url + '">View</a>'+ '<br>' +
    'Owner:' + r.owner.login + '<br>' +
    '<img src="' + r.owner.avatar_url + '" style="width=20px; height:20px;"/>'+
    '<a href="'+r.owner.html_url+'">Visit Profile</a>'+ '<br>'+
    '<a href="#" data-url="' + r.commits_url.slice(0, r.commits_url.length - 6) +
    '" onclick="showCommits(this);">Show Commits</a>' +
     '</li>'
  ).join('')}</ul>`;
  // results.innerHTML =
  document.getElementById('results').innerHTML = resultList;
}

function showCommits(el){
  let url = el.dataset.url;
  let req = new XMLHttpRequest();
  req.addEventListener('load',displayCommits);
  req.open('GET', url );
  req.send();
}

function displayCommits(){
  let commits = JSON.parse(this.responseText);
  const commitList = `<ul>${commits.map(c =>
    '<li>'+
    c.committer.login + '<br>' +
    c.commit.author.name + '<br>' +
    c.sha + '<br>' +
    (c.committer.avatar_url !== null ? '<img src="' + c.committer.avatar_url + '" style="width=20px; height:20px;"/>' : "") +
    c.commit.message + '<hr>'+
    '</li>'
  ).join('')}</ul>`;
  document.getElementById('details').innerHTML = commitList;
}

function displayError(){

}
