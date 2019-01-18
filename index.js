$(document).ready(function (){
});


function searchRepositories(){
	const nameValue = document.getElementById("searchTerms").value;
	// req.addEventListener('load', displayRepositories);
	const url = `https://api.github.com/users/${nameValue}/repos`
	$.get(url, function(data) {
		console.log(data)
		// displayRepositories();
	}).fail(function(error) {
		console.log(error)
		//error
	});
	// req.open('GET', `https://api.github.com/users/${nameValue}/repos`);
	// req.send();
}

function displayRepositories(){
	// get the data and display on the website
}

// var url =
//     'https://api.github.com/repos/rails/rails/commits?sha=82885325e04d78fb7ec608a4670164d842d23078';
 
// $.get(url).done(function(data) {
//     console.log('Done');
//     console.log(data);
// });

// $.get('this_doesnt_exist.html', function(data) {
//     doSomethingGood();
// }).fail(function(error) {
//     console.log('Something went wrong: ' + error.statusText);
// });