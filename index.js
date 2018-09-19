var displayError = () => $("#errors").html("I'm sorry, there's been an error. Please try again.")

var searchRepositories = () => {
  const searchTerms = $("#searchTerms").val()
   $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
     const resultsData = data.items.map(r =>
      `<div>
      <img class="avatar" src="${r.owner.avatar_url}" alt="${r.owner.login}'s Avatar Image">
        <div>
        <h2><a href="${r.html_url}">${r.name}</a></h2>
        <p>${r.description} | <a href="#" onclick="showCommits(${r.owner.login}, ${r.name})">Show Commits</a></p>
        <p><a href="${r.owner.html_url}">Owner: ${r.owner.login}</a></p>
        </div>
      </div><br></br>`).join("")

    $("#results").html(resultsData);
  }).fail( error => {
    displayError();
  })
}

var showCommits = (owner, repo) => {
    $.get(`https://api.github.com/repos/${owner}/${repo}`, data => {
    const commitsData = "Hello World!"
  })
  $("#details").html(commitsData);
}

$(document).ready(function (){
});
