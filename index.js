var displayError = () => $('#errors').html("I'm sorry, there's been an error. Please try again.")



var searchRepositories = () => {
  let searchTerms = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`,

   function(response) {
     console.log(searchTerms);
     var repos = response.items.map(element =>

       `<li>${element.name}</li>
      <li>${element.description}</li>
       <li>${element.html_url}</li>
       <p><a href="#" data-repository="${element.name}" data-owner="${element.owner.login}" onclick="showCommits(this)">Show Commits</a></p>`

     ).join(' ')
       $('#results').html("<ul>" + repos +"</ul>")



     console.log(repos);


   }).fail(error => {
    displayError()
  })
      }


  var renderCommit = (commit) => {
    debugger
    return `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
  }

  var renderCommits = (data) => {
    let result = data.map((commit)=>renderCommit(commit)).join('')
    return `<ul>${result}</ul>`
  }

  var showCommits = (el) => {
    $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
      $('#details').html(renderCommits(data))
    }).fail(error => {
      displayError()
    })
  }
  //
  $(document).ready(function (){

  });
