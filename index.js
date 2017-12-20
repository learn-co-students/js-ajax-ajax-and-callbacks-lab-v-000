$(document).ready(function (){

});
function searchRepositories() {
    const searchTerms = $("#searchTerms").val().split(" ").join("+");
    const searchUrl = `https://api.github.com/search/repositories?q=${searchTerms}`
    $.get(searchUrl, function(response) {
        const results = response.items.map(r =>
            '<h3><a href="' + r.html_url + '">' + r.name + '</a></h3>' +
            r.description + '<br>' +
            'Owner: ' + displayAuthorInfo(r.owner) +
            '<a href="#" data-repository="' + r.name + '" data-owner="' + r.owner.login + '" onclick="showCommits(this)">See Commits</a><br>'
        ).join("");
        $("#results").html(results);
    }).fail(function(error){
        displayError();
    });
}
function displayError() {
    $('#errors').html("I'm sorry, there's been an error. Please try again.");
}
function showCommits(data) {
    // get repo url
    const repoData = data.dataset;
    const commitsUrl = "https://api.github.com/repos/" + repoData.owner + "/" + repoData.repository + '/commits'
    // get commits
    $.get(commitsUrl, function (response) {
        const commits = response.map(r =>
            '<h4>Commit SHA:</h4>' + r.sha + '<br>' +
            '&quot;' + r.commit.message + '&quot;<br>' +
            displayAuthorInfo(r.author)
        ).join("");
        // display commits
        $("#details").html(commits);
    }).fail(function(error){
        displayError();
    })
}
function displayAuthorInfo(author) {
    return('<a href="' + author.html_url + '">' + author.login + '</a><br>' +
    '<img src="' + author.avatar_url + '" width="200px"/><br>')
}