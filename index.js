$(document).ready(function (){
    Handlebars.registerPartial('repositoryTemplate', $('#repository-template')[0].innerHTML);
    // export let searchPathBase = 'https://api.github.com/search/repositories?q='
    // export let Handlebars = Handlebars;
});
const searchPathBase = 'https://api.github.com/search/repositories?q=';



function searchRepositories(){
    const searchPathBase = 'https://api.github.com/search/repositories?q=';
    const query = $('#searchTerms')[0].value;
    const path = searchPathBase + formatQuery(query);
    $.get(path, function(data){
        displayRepositories(data.items)
    }).fail(displayError);
}

function displayRepositories(repos){
    const reposTemplate = $('#repositories-template')[0].innerHTML;
    const reposFn = Handlebars.compile(reposTemplate);
    const reposHTML = reposFn(repos);
    $('#results').html(reposHTML);
    clearTextInput();
}

function clearTextInput(){
    $('#searchTerms')[0].value = '';
}

function formatQuery(query){
    return query.toLowerCase().replace(" ", "_");
}

function showCommits(self){
    const commitsUrl = self.dataset.commitsurl;
    $.get(formatPath(commitsUrl), displayCommits).fail(displayError);
}

function formatPath(path){
    let index
    if(index = path.indexOf('{')){
        return path.slice(0, index);
    }
    return path;
}

function displayCommits(data){
    $('#errors').html(``);
    $('#details')[0].innerHTML = ""
    const commitsTemplate = document.querySelector('#commits-template').innerHTML;
    const commitsFn = Handlebars.compile(commitsTemplate);
    const commitsHTML = commitsFn(data)
    $('#details').html(commitsHTML)
}

function displayError(xhr, status, error){
    $('#errors').html(`<p>I'm sorry, there's been an error ${error}</p>`);
}
