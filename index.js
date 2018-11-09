$(document).ready(function () {
});

function searchRepositories(searchTerms) {
    searchTerms = $('#searchTerms').val();
    const url = `https://api.github.com/search/repositories?q=${searchTerms}`;
    $.get(url).done(function(data) {
        // console.log(data);
        // console.log(data.items);
        const repos = data.items;
        const repoList = `<ul>${repos.map(repo => `<li>${repo.name} by ${repo.owner.login} — <a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}" onclick="showCommits(this)">Show Commits</a></li>`).join('')}</ul>`
        // console.log(repoList);
        $('#results').html(repoList);
    }).fail(function(error) {
        displayError(error);
    });
}

function displayError(error) {
    return $('#errors').html(`error`);
}

function showCommits(el) {
    const repoName = el.dataset.repository;
    const owner = el.dataset.owner;
    const url = `https://api.github.com/repos/${owner}/${repoName}/commits`;

    $.get(url).done(function(data) {
        const commits = data;
        const commitsList = `<ul>${commits.map(commit => `<li>${commit.sha}<br>${commit.commit.author.name}</li>`).join('')}</ul>`
        $('#details').html(commitsList);
    })

}

