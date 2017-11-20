$(document).ready(function (){

});

function searchRepositories() {
  let query = document.getElementById('searchTerms').value
  $.get(`https://api.github.com/search/repositories?q=${query}`, function displayRepositories(event) {
    const repoList =
    `<ul>
        ${event.items.map(r =>
          '<li>'+
            '<a href=https://github.com/'+r.full_name+'>'+r.name+'</a>'+"  "+
            '<a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '"onclick="showCommits(this)">Show Commits</a>'+ "  "+
          '</li>').join('')}
      </ul>`
    document.getElementById("results").innerHTML = repoList
  }).fail(function displayError(error) {
    document.getElementById("errors").innerHTML = error.responseJSON.message
    console.log('Something went wrong: ' + error.responseJSON.message);
  })
}

function displayError(error) {
  document.getElementById("errors").innerHTML = "I'm sorry, there's been an error. Please try again."
}

function showCommits(el) {
  const username = el.dataset.username
  const owner = el.dataset.owner
  const repository = el.dataset.repository
  $.get(`https://api.github.com/repos/${owner}/${repository}/commits`, function displayCommits(event) {
    const commitsList = `<ul>${event.map(commit => '<li>'+ commit.commit.author.name +'<strong> (' + commit.author.login + ')</strong> - ' + commit.commit.message + ' SHA: ' + commit.sha + '</li>').join('')}</ul>`

    document.getElementById("details").innerHTML = commitsList
  })
}


function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li>'+ commit.commit.author.name +'<strong> (' + commit.author.login + ')</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}
