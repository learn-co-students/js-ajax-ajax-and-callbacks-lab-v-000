$(document).ready(function (){
});

function searchRepositories(){
  let params = document.getElementById('searchTerms').value.split(" ").join("+");
  // console.log($.get(`https://api.github.com/search/repositories?q=${params}`));
  $.get(`https://api.github.com/search/repositories?q=${params}`)
    .done(displayRepositories)
    .fail(displayError);
}

function displayRepositories(data){
  console.log(data);
  let results = data.items;
  // console.log(results);
  const resultList = `<ul>${results.map(r =>
    '<li>' + r.name + '<br>' +
    r.description + '<br>' +
    '<a href="' + r.html_url + '">View</a>'+ '<br>' +
    'Owner:' + r.owner.login + '<br>' +
    '<img src="' + r.owner.avatar_url + '" style="width=20px; height:20px;"/>'+
    '<a href="'+r.owner.html_url+'">Visit Profile</a>'+ '<br>'+
    '<a href="#" data-url="' + r.commits_url +
    '" onclick="showCommits(this);">Show Commits</a>' +
     '</li>'
  ).join('')}</ul>`;
  // results.innerHTML =
  $("#results").html(resultList);
}

function showCommits(el){
  let url = `https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`;
  $.get(url)
    .done(displayCommits)
    .fail(displayError);
  // let req = new XMLHttpRequest();
  // req.addEventListener('load',displayCommits);
  // req.open('GET', url );
  // req.send();
}

function displayCommits(data){
  // let commits = data;
  const commitList = `<ul>${data.map(c =>
    '<li>'+
    c.committer.login + '<br>' +
    c.commit.author.name + '<br>' +
    c.sha + '<br>' +
    (c.committer.avatar_url !== null ? '<img src="' + c.committer.avatar_url + '" style="width=20px; height:20px;"/>' : "") +
    c.commit.message + '<hr>'+
    '</li>'
  ).join('')}</ul>`;
  $('#details').html(commitList);
}

function displayError(){
 $('#errors').html("I'm sorry, there's been an error. Please try again.");
}
