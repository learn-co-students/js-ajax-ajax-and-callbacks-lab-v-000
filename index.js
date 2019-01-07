$(document).ready(function (){

});
function api_call(url, callbacks){
  let jsxhr = $.get(url, () => {console.log("Success")})
  jsxhr.fail( callbacks.fail )
  jsxhr.done(callbacks.success)
}
function displayError(){
  $("#errors").html("error")

}

function searchRepositories(){
  let search_terms = $("#searchTerms").val()
  let api_call_root = "https://api.github.com/search/repositories?"
  let api_call_query = `q=${search_terms}`
  let success = (resp) => {
    search_terms = search_terms.split('')
    search_terms[0] = search_terms[0].toUpperCase()
    search_terms = search_terms.join('')
    $("#results").html(`${search_terms}<br/>Repos found: ${resp.total_count}`)
    }
  let fail = () => { displayError() }
  api_call(api_call_root + api_call_query, {"success": success, "fail": fail})
}

function showCommits(repo_details){
//  let xhr = new XMLHttpRequest()
//  xhr.setRequestHeader("Accept", "application/vnd.github.cloak-preview")
  let api_call_root = `https://api.github.com/repos/${repo_details.dataset.owner}/${repo_details.dataset.repository}/commits/`
  //let api_call_query = `q=repo:${repo_details.owner}/${repo_details.repository}`
  let success = (resp) => {
      let sha = resp[0].sha
      console.log(sha)
      $("#details").html(sha)
  }
  let fail = () => { displayError() }
  api_call(api_call_root, {"success": success, "fail": fail})
  }
