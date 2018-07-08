$(document).ready(function (){
});

function searchRepositories(){
  const searchTerms = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
      showSearchResults(data)
    }).fail(error => {
      displayError()
    })
}

function showSearchResults(data){
  $('#results').html(
    `<ul>` +  data.items.map(d => {return `<li>${d.name}<br><br>
                                               ${d.owner.login}<br><br>
                                               <a href="#" data-repository="${d.name}" data-owner="${d.owner.login}" onClick="showCommits(this)">Show Commits</a><br><br>
                                               </li>`}).join(' ') + `<ul>`
  )
}

function displayError(){
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

function showCommits(el){
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits/`, data => {
      displayCommits(data)
    }).fail(error => {
      displayError()
    })
}

function displayCommits(data){
  debugger;
  $('#details').html(
    `<ul>` +  data.map(d => {return `<li><a href="${d.html_url}">
                                          ${d.commit.message}</a></li>`}).join(' ') + `<ul>`
  )
}
