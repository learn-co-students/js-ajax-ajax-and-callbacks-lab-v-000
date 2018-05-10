function searchRepositories() {
  const searchTerms = $("#searchTerms")[0].value;
  const url = `https://api.github.com/search/repositories?q=${searchTerms}`;
  $.get(url).done(function(data) {
    $("#results")[0].innerHTML = "";
    data.items.forEach((repo) => {
      const resultsList = `
      <ul>
        <img scr=${repo.owner.avatar_url} height="80" width="80">
        <li>${repo.owner.login}</li>
        <li>${repo.name}</li>
        <li>${repo.description}</li>
        <li><a href="${repo.html_url}">Repo Link</a></li>
        <li><a href="#" onclick="showCommits(this);" data-owner="${repo.owner.login}" data-repository="${repo.name}">Show Commits</a></li>
      </ul>
      `.trim();
      $("#results").append(resultsList);
    })
  }).fail(displayError);
}

function displayError(error) {
  $("#errors").append(`<p>error, no repos found matching <em>${searchTerms}</em></p>`);
}

function showCommits(link) {
  const repo = link.dataset.repository;
  const owner = link.dataset.owner;
  const url = `https://api.github.com/repos/${owner}/${repo}/commits`
  $.get(url).done(function (data) {
    $("#details")[0].innerHTML = "";
    data.forEach((result) => {
      const commitList = `
      <ul>
        <li>${result.sha}</li>
        <li>${result.commit.message}</li>
        <li>${result.commit.author.name}</li>
        <li>${result.author.login}</li>
      </ul>
      `.trim();
      $("#details").append(commitList);
    });
  });
}
