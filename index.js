$(document).ready(function (){
    // This breaks the tests for obscure reasons
    // Handlebars.registerPartial('authorPartial', $('#author-partial-template').html());

    $('#search').on("click", searchRepositories);
});

// AJAX HANDLERS
function searchRepositories(){
    const query = $('#searchTerms').val();
    console.log(`Query: "${query}"`);

    $.get(`https://api.github.com/search/repositories?q=${query}`)
    .done(showMatchingRepositories)
    .fail(displayError); 
};

function showCommits(link){
    console.log(link);
    const owner = link.dataset.owner;
    const repository = link.dataset.repository;

   $.get(`https://api.github.com/repos/${owner}/${repository}/commits`)
    .done(showMatchingCommits)
    .fail(displayError);
}

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

function showMatchingCommits(response){
    console.log("Success! Here are the repo's commits:");
    console.log(response);

    const src = $('#commits-list-template').html();
    const template = Handlebars.compile(src);
    const commitList = template(response);

    $('#details').html(commitList);
}

function displayError(){
    $('#errors').text("I'm sorry, there's been an error. Please try again.");
}
