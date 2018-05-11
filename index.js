// check if the document is fully loaded
$(document).ready(function (){
});
// then it allow the rest of the code to run


// When the document is ready, send a request to the uri: 
//catch the response, display it in the "results" div
// the information displayed will be: 
// - repository name
// - description
// - link to the html URL
// - repository owner login
// - repository owner avatar (image)
// - link to the owner profile page
function searchRepositories(){
	//store the value of the search keyword (name of the repo)

	const searchTerms = $('#searchTerms').val();
	// make a request to the URI https://api.github.com/search/repositories/repo_name 
	// and execute the function that display the data upon completion
	$.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
		// define the content of the results div to the data received
		
		$('#results').html(displayRepositories(data))
		// call on another function if there is an error
	}).fail(error => {
		displayError();
	});
}



// define the function that handle the display of the data recieved
function displayRepositories(data) {
	const item = data.items[0]
	debugger
    return `
    <div>
      <h2><a href="${item.html_url}">${item.name}</a></h2>
      <p><a href="#" data-repository="${item.name}" data-owner="${item.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
      <p>${item.description}</p>
    </div><br>`

  };


function displayError () {
  $("#errors").html("There's been an error with your request. Please try again.");
}

function showCommits(data){
	$.get(`https://api.github.com/repos/${data.dataset.owner}/${data.dataset.repository}/commits`, data =>{
    $('#details').html(displayCommits(data))
  }).fail(error => {
    displayError();
  });
}


function displayCommits (data) {
  let result = data.map((commit) => {
    return `
      <div>
        <li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>
      </div>`
  }).join('');
    return `<ul>${result}</ul>`;
}




