function searchRepositories() {
    var searchTerms = $("#searchTerms").val()
    var url = "https://api.github.com/search/repositories?q=" + searchTerms
    $.get(url, function(data) {
        // debugger
       $("#results").html(renderResults(data));
    }).fail(function(error) {
      // This is called when an error occurs
      console.log('Something went wrong: ' + error);
    });
}


function renderResults(data) {
    // debugger
    data.forEach(function(r) {
        debugger
    return '<ul>' +
        (`<li>
            <h2>Name: ${r.name}</a></h2>
            <a href="${r.html_url}">HTML URL</a>
            <p>Description: ${r.description}</p>
            <p>Login: ${r.owner.login}</p>
            <img src="${r.owner.avatar_url}">
            <a href="${r.owner.html_url}">Profile page</a>
        </li>`).join('') + "</ul>"
    });
}

$(document).ready(function (){
    
});
