function searchRepositories() {
  const searchTerms = document.getElementById("searchTerms").value;
  console.log(searchTerms);
  console.log(`https://api.github.com/search/repositories?q=${searchTerms}`)

  $(document).ready(function() {
    $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(response) {

      //console.log(response.items[0]);
      const repos = response.items
      const repoList = '<ul>' + repos.map(
          r => {
            return (`
              <li>
                <p>${r.name}<br>
                - ${r.description}<br>
                - <a href="${r.html_url}" target="_blank">${r.html_url}</a></p>
              </li>
            `)
          }
        ).join('') + '</ul>';
      $("#results").html(repoList);
    })
    .fail(function(error) {
      console.log('Something went wrong: ' + error);
      displayError();
    });
  });


}

function displayError() {
  document.getElementById("errors").innerHTML += "I'm sorry, there's been an error.";
}
