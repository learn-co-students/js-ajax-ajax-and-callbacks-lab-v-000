$(document).ready(function (){

})

function searchRepositories() {
  let searchTerms = $("#searchTerms")[0].value
  const github = "https://api.github.com"
  const url = github + "/search/repositories" + `?q=${searchTerms}`
  $.get(url).done(function(data) {
    displayRepositories(data)
  })
}

function displayRepositories(data) {
  // $('#results').html(info)
  console.log("we're here!!!")
  console.log(data)

  // console.log(data)
  // console.log(data.items[0].name)
}
