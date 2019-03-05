$(document).ready(function (){
});

function searchRepositories() {
    const searchTerms = $('#searchTerms').value
    $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(data) {

    let html = data.items.map(repo => {
        `<div>
            <h2>hi</h2>
        </div>`
    })
    
    $("#results").html(html)
  })
}

