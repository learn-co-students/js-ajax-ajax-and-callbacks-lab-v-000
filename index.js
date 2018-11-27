$(document).ready(function (){
        $("#link").click(function(){
             searchRepositories()
            
    })
    
});
function searchRepositories(){
    var terms = document.getElementById('searchTerms').value
    var URI = "https://api.github.com/search/repositories?q=" + terms
    $.get(URI, function(response) {
        // console.log(response)
        var names = response.items.map(r => `<li><a href="${r.html_url}">${r.name}</a></li>
            <p>${r.description}</p>
            <p><a href="${r.owner.html_url}">${r.owner.login}</p>
            <img src="${r.owner.avatar_url}">
            <p><a href="#" data-owner=${r.owner.login} data-repository=${r.name} onclick="showCommits(this)">Show Commits</a>`).join('')
            {$("#results").html(names)}

        }).fail(function (){
            displayError()
        })
    }

    function showCommits(element) {
        var URL = "https://api.github.com/repos/" + element.dataset.owner + "/" + element.dataset.repository + "/commits"
        $.get(URL, function(response) {
            console.log(response)
            var names = response.map(r => `<p>${r.author}</p>
            <p>${r.author.login}</p>
            <img src="${r.committer.avatar_url}">
            <p>${r.sha}</p>`)
            {$("#details").html(names)}
        }).fail(function (){
            displayError()
        })
    }

    function displayError() {
        $("#errors").html("I'm sorry, there's been an error. Please try again.")
    }