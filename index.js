$(document).ready(function (){
});


function searchRepositories() {
  const term = document.getElementById('searchTerms').value;
  const url = `https://api.github.com/search/repositories?q=${term}`
  $.get(url, data => {
    $('#results').html(renderResults(data))
  })
}

function renderResults(data) {
  
}

(data) => data.items.map( result => renderSearchResult(result))