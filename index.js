$(document).ready(function (){
});



searchRepositories() {
	const repoSearch = "https://api.github.com/search/repositories?q="
	let searchTerm = $('#searchTerm')
	let url = repoSearch + searchTerm


	$.get(url, function(response) {
	    // Here we are getting the element on the page with the id of sentences and
	    // inserting the response
	    $('#details').html(response);
	}).fail(function(error) {
	    // This is called when an error occurs
	    console.log('Something went wrong: ' + error.statusText);
	});


}



// $.get('this_doesnt_exist.html', function(data) {
//     // This will not be called because the .html file request doesn't exist
//     doSomethingGood();
// }).fail(function(error) {
//     // This is called when an error occurs
//     console.log('Something went wrong: ' + error.statusText);
// });



