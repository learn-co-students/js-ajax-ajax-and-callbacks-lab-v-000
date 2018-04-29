$(document).ready(function (){
    $("#searchRepositories").on('click', searchRepositories);
});

function searchRepositories() {
    const searchTerms = $("#searchTerms").val();
    url = "https://api.github.com/search/repositories?q=" + searchTerms;
    $.get(url, function(repos) {
        $.each(repos.items, function(index, repo) {
            $("#results").append(`
                <li>
                    <h3>${repo.name}: ${repo.description}</h3>
                    <p><a href="${repo.html_url}">${repo.html_url}</a></p>
                    <img height="30px" width="30px" src="${repo.owner.avatar_url}">
                    <p>By ${repo.owner.login} (<a href="${repo.owner.url}">${repo.owner.url}</a></p>
                    <a data-owner="${repo.owner.login}" data-repository="${repo.name}" onclick="showCommits(this)" href="#">Show Commits</a>
                </li>
            `);
        })
    }).fail(function(error) {
        displayError(error);
    });
}

function showCommits(el) {
    owner = el.dataset.owner;
    repository = el.dataset.repository;
    url = `https://api.github.com/repos/${owner}/${repository}/commits`
    $.get(url, function (commits) {
        $.each(commits, function(index, commit) {
            $("#details").append(`
                <li>
                    <p>Sha: ${commit.sha}</p>
                    <img height="50px" width="50px" src="${commit.author.avatar_url}">
                    <p>By: ${commit.commit.author.name} (${commit.author.login})</p>
                    
                </li>
            `);
        });
    }).fail(function(error) {
        displayError(error);
    });
}

function displayError(error) {
    $("#errors").append('error');
}
