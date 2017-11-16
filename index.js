$(document).ready(function (){

    $.get('this_doesnt_exisit.html', function(data){
        console.log('ok')
    }).fail(displayError())
});

function displayError() {
    const error = "I'm sorry, there's been an error. Please try again."
    document.getElementById('errors').innerHTML = error
    console.log(error)
}

function searchRepositories() {
    const searchTerm = document.getElementById('searchTerms').value
    const url = "https://api.github.com/search/repositories?q=" + searchTerm;
    $.getJSON(url)
    .done(function(data) {
        console.log('Done');
        const repos = data.items
        console.log(repos)
        const repo = '<ul>'+ repos.map( r=> {
            return (`
                    <li>

                        <h2>${r.description}</h2>
                        <a href="#" data-owner="${r.owner.login}"data-repository="${r.name}" onclick='showCommits(this)'>All Commits</a>
                    </li>

                    `)
        }).join("")+'</ul>'
        document.getElementById('results').innerHTML = repo
    })

}

function showCommits(el) {
    const owner = el.dataset.owner
    const repo = el.dataset.repository
    const url = "https://api.github.com/repos/"+owner+"/"+repo+"/commits"
    $.getJSON(url)
    .done(function(data) {
        console.log('Done2')
        const commits = data
        const c = '<ul>'+ commits.map( commit=> {
            return (`
                    <li>

                        <h2>${commit.url}</h2>
                    </li>

                    `)
        }).join("")+'</ul>'
    document.getElementById('details').innerHTML = c
    })
}
