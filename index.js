$(document).ready(function (){
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
}

function displayError(){
    $('#errors').text("I'm sorry, there's been an error. Please try again.");
}
