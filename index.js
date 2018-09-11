$(document).ready(function (){
});

function searchRepositories(){
    const searchTerms = $('#searchTerms').val();
    const url = `https://api.github.com/search/repositories?q=${searchTerms}/`
    $.get(url, function(response){
        $("#results").html(showRepositories(response));
        // we pass the response to a new function (the callback), so that we can begin handling the response in another seperate function. 
    });
}


function showRepositories(response){
    const repos = response.items;
    return repos.map(repo => `<li> Name: {repo.name} </li><br>
            <li> Description: {repo.description} </li><br>
            <li> Link to HTML URL: {repo.html_url} </li><br>
            <li> Owner Login: {repo.owner.login} </li><br>
            <li> Avatar: <img src=" {repo.owner.avatar_url} "> </li><br>
            <li> Owner's Profile Page: {repo.owner.url} </li><br>`);
;}

// function printDetails(repo){
//     return `<li> Name: {repo.name} </li><br>
//             <li> Description: {repo.description} </li><br>
//             <li> Link to HTML URL: {repo.html_url} </li><br>
//             <li> Owner Login: {repo.owner.login} </li><br>
//             <li> Avatar: <img src=" {repo.owner.avatar_url} "> </li><br>
//             <li> Owner's Profile Page: {repo.owner.url} </li><br>    
//             `
// };

