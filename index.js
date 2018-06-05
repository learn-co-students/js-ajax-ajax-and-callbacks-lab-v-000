$(document).ready(function () {
  
});

function displayError() {
    $("#errors").html("I'm sorry, there's been an error. Please try again.")
}

function searchRepositories() {
    const searchTerms = $("#searchTerms").val()
    const uri = `https://api.github.com/search/repositories?q=${searchTerms}`
    $.get(uri, function(data) {
            $("#results").html(data.items.map(function(result) {
                return(`<div>
                <h2><a href="${result.html_url}">${result.name}</a></h2>

                <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>

                <p>${result.description}</p>
            </div>
            <hr>`)})       
    )}
).fail(error => {
        displayError()
})}

function showCommits(el) {
    const uri = `https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`
    $.get(uri, function(data) {
        console.log(data)
        $('#details').html(data.map(function(result) {
            return(`
                <div><h3>Author: ${result.author.login}</h3>
                <p>SHA: ${result.sha}</p>
                <p>ID: ${result.author.id}</p>
                <p><img src="${result.author.avatar_url}" height="30px" width="30px"></p>
                <p>Description: ${result.commit.message}</p>
                </div>
            `)
        }))
    }).fail(error => {displayError()})
}


