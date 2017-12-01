function displayError(){
   $("#errors").html("I'm sorry, there's been an error. Please try again.")
}

var searchRepositories = () => {
  const searchTerms = $('#searchTerms').val() //Get the current value of the first element in the set of matched elements or set the value of every matched element.
    $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, renderSearchResults)
    .fail(displayError);
}

function showCommits(el){
    $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, renderCommits)
    .fail(displayError);
}

/* Display the collection of repositories inside the results div. 
Include repository name, description, and a link to the HTML URL. 
Also include repository owner login, repository owner avatar as an image, 
and a link to the owner's profile page.*/

function renderSearchResults(response){
    var result = response.items.map(function(item){
       return(`
            <li>
              <h2>${item.name}</h2>
              <h3>${item.description}</h3>
              <a href="${item.html_url}">${item.html_url}</a><br> 
              <a href="#" data-owner="${item.owner.login}" data-repository="${item.name}" onclick="showCommits(this)">Get Commits</a><br>
            </li>
            <img src="${item.avatar_url}">
            <footer>Created By: ${item.owner.html_url}</footer>`
            ) 
   }).join('') + "</ul>";
  
    $("#results").html(result);
}

//For each commit, list the SHA, the author, the author's login, and the author's avatar as an image.
function renderCommits(response){
    var result = response.map(function(commit){
       return(`
            <li>
              <h2>${commit.sha}</h2>
              <h3>${commit.commit.message}</h3>
            <img src="${commit.author.avatar_url}">
            <h4>Commit By: ${commit.author.html_url} | ${commit.author.login}</h4>
            </li>`
            ) 
   }).join('') + "</ul>";
  
    $("#details").html(result);
}