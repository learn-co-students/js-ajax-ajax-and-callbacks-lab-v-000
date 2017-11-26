$(document).ready(function (){
  console.log('Ready')
});

function searchRepositories() {
  let searchTerms = $("input#searchTerms")[0].value
  debugger
  let searchTermsArr = searchTerms.trim().split(' ')
  let queryString = "?q=topic:" + searchTermsArr.join("+topic:")
  debugger
  $.get(`https://api.github.com/search/repositories${queryString}`, function(data){
    //do this on success
    const repoList = '<ul>' + data.items.map(i => {
      return (`
              <li>
                <h2><a href="${i.html_url}">${i.name}</a></h2>
                <p>Description: ${i.description}<p>
              <li>`
            )
    }).join('') + '</ul>';
    debugger
    $("div#results").html(repoList);

  }).fail(displayError)
}

function displayError(){
  $("div#errors").html(`<p>I'm sorry, there's been an error. Please try again.</p>`)
}
