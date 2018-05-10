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
      </ul>
      `.trim();
      $("#results").append(resultsList);
    })
  }).fail(function (error) {
    $("#errors").append(`<p>Error, no repos found matching <em>${searchTerms}</em></p>`);
  });
}
