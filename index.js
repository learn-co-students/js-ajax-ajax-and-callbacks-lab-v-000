var displayError = () => $("#errors").html("I'm sorry, there's been an error. Please try again.")

var searchRepositories = () => {
  const searchTerms = $("#searchTerms").val()
   $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
     const resultsData = data.items.map(r =>
      `<div>
      <img class="avatar" src="${r.owner.avatar_url}" alt="${r.owner.login}'s Avatar Image">
        <div>
        <h2><a href="${r.html_url}">${r.name}</a></h2>
        <p>${r.description} | <a href="#" data-repository="${r.name}" data-owner="${r.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
        <p><a href="${r.owner.html_url}">Owner: ${r.owner.login}</a></p>
        </div>
      </div><br></br>`).join("")

    $("#results").html(resultsData);
  }).fail( error => {
    displayError();
  })
}

var showCommits = (el) => {
    debugger
    $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
      const commitsData = data.map(c =>
        `<div>
          <img class="avatar" src="${c.author.avatar_url}" alt="${c.author.login}'s Avatar Image">
          <p>Author: ${c.commit.author.name} , AKA: ${c.author.login}</p>
          <p>SHA: ${c.sha}</p>
        </div>
        <br></br>`).join("")
   $("#details").html(commitsData);
  })
}

$(document).ready(function (){
});
