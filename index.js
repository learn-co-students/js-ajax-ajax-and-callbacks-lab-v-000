$(document).ready(function (){
    Handlebars.registerPartial('authorPartial', $('#author-partial-template').html());

    $('#search').on("click", searchRepositories);
});


function searchRepositories(){
    const query = $('#searchTerms').val();
    console.log(`Query: "${query}"`);

    $.get(`https://api.github.com/search/repositories?q=${query}`)
    .done(showMatchingRepositories)
    .fail(displayError); 
};

// AJAX CALLBACKS
function showMatchingRepositories(response){
    console.log("Success!");
    console.log(response);

    console.log(Handlebars);

    const src = $('#repository-list-template').html();
    const template = Handlebars.compile(src);
    const repoList = template(response.items);

    $('#results').html(repoList);

    /*
    Display the collection of repositories inside the results div. 
    Include repository name, description, and a link to the HTML URL. 
    Also include repository owner login, repository owner avatar as an image, 
    and a link to the owner's profile page. 
    Hint: Pay close attention to the structure of the search results!
    */
}

function displayError(){
    $('#errors').text("I'm sorry, there's been an error. Please try again.");
}
