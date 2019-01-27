$(document).ready(function (){
});



  function displayError(){
    $('#errors').html("there was an error, try again, please")
  };


  function searchRepositories(){
    var req = document.getElementById('searchTerms').value
    var url = 'https://api.github.com/search/repositories?q=' + req
    $.get(url).done(function(response){
      result = response.items.map(r => `<div>
        <h2><a href="${r.html_url}">${r.name}</a></h2>
        <p><a href="#" data-repository="${r.name}" data-owner="${r.owner.login}" onclick="showCommits(this)">Show Commits</a></p>`)
      $('#results').html(result);
    }).fail(error => {
      displayError()

    });
  }

  function showCommits(el){
    var url = `https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`
    $.get(url).done(function(data){
      // div. For each commit, list the SHA, the author,
      // the author's login, and the author's avatar as an image.
      result = data.map(commit => `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`)
      debugger;
      $('#details').html(result);
    }).fail(error => {
      displayError()
    })
  };
