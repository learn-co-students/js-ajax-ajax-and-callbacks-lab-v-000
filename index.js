function searchRepositories() {
    $(document).ready(function() {
        const q = $("#searchTerms").val();
        console.log(q);
        $.get(`https://api.github.com/search/repositories?q=${q}`, function(data) {

            $("#results").html(data.items.map(r => renderData(r)));
        });
    });
}

function renderData(repo) {
    return `
        <h4>Repository Info</h2>
        Name:${repo.name} </br>
        Description:${repo.description}</br>
        Url: <a href="#"> ${repo.html_url}</a>
        <h4>Owner Info</h2>
        Avatar: <img src="${repo.owner.avatar_url}"> </br>
        Name: ${repo.owner.login} </br>
        Url: <a href="#"> ${repo.owner.html_url}"</a> </br>
        `
}