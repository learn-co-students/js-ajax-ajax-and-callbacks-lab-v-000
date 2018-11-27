var displayError = () => {                   //set displayError variable to function
  $('#errors').html("I'm sorry, there's been an error. Please try again.")  //fill errors html element w/error msg
}

var displaySearchResult = (r) => {         //set display search result variable
  return `<div>                             
  <h3>${r.name}- ${r.description}</h3>         
  <a href="#" data-repository="${r.name}" data-owner="${r.owner.login}""onclick="showCommits(this)">Get Commits</a>
  <p>owner: <a href="#" ${r.owner.login}>${r.owner.login}</a></p>
  <img src="${r.owner.avatar_url}"
  </div>`
}

var displayCommits = (r) => {
  return `<div>
  <p>SHA: "${r.sha}"</p>;
  <p>Author: "${r.author.name}"</p>;
  <p>Author Login: "${r.author.login}"</p>;
  <p>img src="${r.author.avatar_url}"</p>;`
}

function searchRepositories() {
  const searchTerms = document.getElementById("searchTerms").value;     //grab element in searchTerms & assign to var
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(response) {
    const repoResults = `${response.items.map(r => displaySearchResult(r)).join('')}`
    $("#results").html(repoResults)
  }).fail(error =>{displayError()
  })
}

function showCommits(el) {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, function(response) {
    const commitResults = `${response.map(r => displayCommits(r)).join('')}`
    $("#details").html(commitResults)
  }).fail(error =>{displayError()
  })
}

$(document).ready(function () {
});
