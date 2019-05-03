$(document).ready(function (){

});
function displayError() {
  $('#errors').html("<p> I'm sorry, there's been an error. Please try again.")

}
function searchRepositories() {
  let search = document.getElementById("searchTerms").value;
  let url = "https://api.github.com/search/repositories?q="+search
  $.get(url, function(response) {
    let results = response.items[0].name + " <a href='#' data-repository='"+ response.items[0].name +"' data-owner='"+ response.items[0].owner.login +"'onclick=showCommits(this)> Show Commits </a>"
    $("#results").html(results);
  }).fail(displayError())
}

function showCommits(el) {
  const repo = el.dataset.repository
  const username = el.dataset.owner
  $.get('https://api.github.com/repos/'+ username +'/' + repo + '/commits', function(response) {
    let results = response[0].sha + " " +response[0].author.login
    $("#details").html(results)
  }).fail(displayError())


}
