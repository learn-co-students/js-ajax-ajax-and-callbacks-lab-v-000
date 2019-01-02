$(document).ready(function (){
  
});

function displayError() {
    let message = "I'm sorry, there's been an error. Please try again."
    document.getElementById('errors').innerHTML = message;
}

function searchRepositories() {
    const username = document.getElementById('searchTerms').value;
    const query = `q=${username}`
    $.get('https://api.github.com/search/repositories?' + query, function(response) {
        for (let i = 0; i < response.items.length; i++) {
            let result = response.items[i];
            let addition = `<p>
                <h2>${i + 1}. <a href="${result.html_url}" target="_blank">${result.name}</a></h2>
                <img src="${result.owner.avatar_url}" style="height:40px;width:40px;">
                Author: <a href="${result.owner.html_url}" target="_blank">${result.owner.login}</a><br>
                Description: ${result.description}<br>
                <a href="#" data-owner="${result.owner.login}" data-repository="${result.name}" onclick="showCommits(this)">Show Commits</a>
            </p>`;
            document.getElementById('results').innerHTML += addition;
        }
    }); 
}

function showCommits(el) {
    const owner = el.dataset.owner;
    const repository = el.dataset.repository;
    $.get(`https://api.github.com/repos/${owner}/${repository}/commits`, function(response) {
        for (let i = 0; i < response.length; i++) {
            console.log(response)
            let result = response[i];
            let addition = `
            <p>
                SHA: ${result.sha}<br>
                <img src="${result.author.avatar_url}" style="height:40px;width:40px;">
                Author: ${result.commit.author.name}<br>
                Login: <strong>${result.author.login}:</strong> ${result.commit.message}
            </p>`;
            document.getElementById('details').innerHTML += addition;
        }
        });
}