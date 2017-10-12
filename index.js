function searchRepositories () {
  $.get(`https://api.github.com/search/repositories?q=${searchTerms.value}`).done(data => {
      $('#results').html(showRepositories(data))
    }).fail((e) => displayError())
}

// function showRepositories (data) {
//   const src = document.getElementById("repository-template").innerHTML;
//   Handlebars.registerPartial("authorPartial", $("#author-partial-template").html());
//   const template = Handlebars.compile(src);
//   const repoList = template(data);
//   $("#results").html(repoList);
// }

function showRepositories (data) {
  return data.items.map( result => showRepository(result));
}

function showRepository (result) {
  return `
      <div>
        <h2><a href="${result.html_url}">${result.name}</a></h2>
        <p><a href="#" data-full-name="${result.full_name}" onclick="showCommits(this)">Show Commits</a></p>
        <p>${result.description}</p>
      </div>
      <hr>
    `
}

function showCommits (element) {
  console.log(element.dataset.fullName);
  $.get(`https://api.github.com/repos/${element.dataset.fullName}/commits`, data => {
    $('#details').html(renderCommits(data))
  }).fail((e) => displayError());
}


function renderCommit (commit) {
  return `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
}

function renderCommits (data) {
  let result = data.map((commit)=>renderCommit(commit)).join('')
  return `<ul>${result}</ul>`
}

// function renderCommits(commits) {
//   const src = $("#commits-template").html();
//   const template = Handlebars.compile(src);
//   const commitList = template(commits);
//   $('#details').html(commitList);
// }


function displayError (){
  $('#errors').html("error");
} 


