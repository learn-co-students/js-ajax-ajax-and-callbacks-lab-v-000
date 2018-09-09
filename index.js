$(document).ready(function (){
    $('#search').on("click", searchRepositories);
});


function searchRepositories(){
    const query = $('#searchTerms').prop('value');
    console.log(`Query: "${query}"`);
};