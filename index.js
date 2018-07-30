function searchRepositories(){
    let uri = "https://api.github.com/search/repositories?q=";
    let searchTerms = $("#searchTerms").val();
    $.get(`${uri}${searchTerms}`)
        .done(displayRepos)
        .fail(displayError);
};

function displayRepos(response){
    $("#results").html(response.items.map(repo => {
        return (
            `<ul>
                <li>${repo.name}</li>
                <li>${repo.description}</li>
                <li><a href="${repo.html_url}">Repo link</a></li><br>
                <li><img src="${repo.owner.avatar_url}" width="100px"></li>
                <li><a href="${repo.owner.url}"> ${repo.owner.login}'s profile page</a></li>
                <li><a href="#" onclick="showCommits(this);"
                        data-owner="${repo.owner.login}" data-repository="${repo.name}">
                    Show Commits</a></li>
            </ul>`
        )
    }).join(""));
};

function showCommits(el){
    const username=el.dataset.owner;
    const repository=el.dataset.repository;
    let query=`https://api.github.com/repos/${username}/${repository}/commits`;
    $.get(query)
        .done(displayCommits)
        .fail(displayError);
};

function displayCommits(resp){
    $("#details").html(resp.map(c=>{
      return (`<div>
                <img src="${c.author.avatar_url}" width="100px"><br>
                <h4>${c.commit.author.name}- (${c.author.login})</h4>
                <p>${c.sha}</p>
              </div>`);
    }).join(""));
};

function displayError(){
    const error = "I'm sorry, there's been an error. Please try again."
    $("#errors").html(error);
};

$(document).ready(function (){
});