$(document).ready(function (){
});



function searchRepositories() {
	debugger
	const repoSearch = "https://api.github.com/search/repositories?q="
	let searchTerms = $('#searchTerms').val()
	let url = repoSearch + searchTerms


	$.get(url, function(response) {
		debugger
	    // Here we are getting the element on the page with the id of sentences and
	    // inserting the response
	    $('#details').html(response);
	}).fail(function(error) {
	    // This is called when an error occurs
	    displayError(error)
	});


}


function displayError(error){
	$('#errors').html('Something went wrong: ' + error.statusText);
}



// $.get('this_doesnt_exist.html', function(data) {
//     // This will not be called because the .html file request doesn't exist
//     doSomethingGood();
// }).fail(function(error) {
//     // This is called when an error occurs
//     console.log('Something went wrong: ' + error.statusText);
// });



