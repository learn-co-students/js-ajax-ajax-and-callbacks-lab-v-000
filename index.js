$(document).ready(function (){
  // $.get('url', function(resp){
  //   $('results').html(resp)
  // }).fail(displayError)
  // window.Handlebars = require('handlebars');

});

function displayError(){
  document.getElementById('errors').innerHTML = "I'm sorry, there's been an error. Please try again."
}

function searchRepositories(){
  let url = 'https://api.github.com/search/repositories?q=' + document.getElementById('searchTerms').value
  $.get(url, function(response){
    // debugger
    // let templateFn = Handlebars.compile(document.getElementById('repo-template').innerHTML)
    // let templateHtml = templateFn(response.items)
    // $('#results').html(templateHtml)
    let namehtml = ''
    for (const el of response.items){
      namehtml += `<p>${el.name}</p>`
      $('#results').html(namehtml)
    }
  })
}

function showCommits(el){
  let url = 'https://api.github.com/repos/' + el.dataset.owner + '/' + el.dataset.repository + '/commits'
  $.get(url, function (response){
    let shahtml = ''
    for (const el of response){
      shahtml += `<p>${el.sha}</p>`
      $('#details').html(shahtml)
    }
  })
}
