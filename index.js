$(document).ready(function (){

});

function searchRepositories() {

  let search = document.getElementById("searchTerms").value;
  $.get(`https://api.github.com/search/repositories?q=${search}`, function(response) {
    console.log(response)

    $("#results").html(response.items.map(r => template.call(r)));
  }).fail(displayError());

}

function template() {
  return `<p>Name: ${this.name}</p> <p>Description: ${this.description}</p>
  <a href="${this.html_url}">HTML</a> <br> <a href="#" onclick="showCommits({name: ${this.name}, owner: ${this.owner.login}})">Show Commits</a>`
}

function displayError() {
  $("#errors").html("<p>I'm sorry, there's been an error. Please try again.</p>");
}

function showCommits(el) {
  debugger
  let repo =
  $.get(`https://api.github.com/repos/oc/Hello-World/commits`, function(response) {
    console.log(response)
    $("#details").html()
  })
}
