$(document).ready(function (){

});


function searchRepositories() {
  let searchTerms = $('#searchTerms').val()
$.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(data){
  console.log(data)
  var repo = data.items[0]
  var img = `<img height="50"src="${repo.owner.avatar_url}"><br>`
  let login = `Login: ${repo.owner.login}<br>`
  let search = `<h2>Search for: ${searchTerms}</h2>`
  var displayData = `${search}${img} ${login} ${repo.name} - ${repo.description} - ${repo.html_url}<br> <a data-owner="${repo.owner.login}" data-repository="${repo.name}"href="#" onclick="showCommits(this)">Show Commits</a>`
    $('#results').html(`${displayData}`)
}).fail(function(){
    displayError()
  })
}

function showCommits(el){
  let repo = el.dataset.repository
  let owner = el.dataset.owner
  $.get((`https://api.github.com/repos/${owner}/${repo}/commits`), function(data){
    let commitsList = '<ul>'
    data.map(function(d){
      let img = `<img height="50" src = "${d.author.avatar_url}">`
      let sha = `Sha: ${d.sha}<br>`
      let login = `Login: ${d.author.login }<br>`
        return  commitsList +=`<li>${img} Owner: ${owner}<br> ${login} ${sha}</li>`
     })
     commitsList +="</ul>"
     $('#details').html(`${commitsList}`)
  }).fail(function(){
      displayError()
    })
}

// function searchRepositories() {
//   let searchTerms = $('#searchTerms').val()
//   fetch(`https://api.github.com/search/repositories?q=${searchTerms}`)
//   .then(function(response){
//     return response.json();
//   })
//   .then(function(data){
//   var repo = data.items[0]
//   var img = `<img height="50"src="${repo.owner.avatar_url}"><br>`
//   let login = `Login: ${repo.owner.login}<br>`
//   let search = `<h2>Search for: ${searchTerms}</h2>`
//   var displayData = `${search}${img} ${login} ${repo.name} - ${repo.description} - ${repo.html_url}<br> <a data-owner="${repo.owner.login}" data-name="${repo.name}"href="#" onclick="showCommits(this)">Show Commits</a>`
//     $('#results').html(`${displayData}`)
//   })
//   .catch(function(error){
//     displayError()
//   })
// }

  // function showCommits(el){
  //   let repo = el.dataset.name
  //   let owner = el.dataset.owner
  //   fetch(`https://api.github.com/repos/${owner}/${repo}/commits`)
  //   .then(function(response){
  //     return response.json();
  //   })
  //   .then(function(data){
  //     let commitsList = '<ul>'
  //     data.map(function(d){
  //       let img = `<img height="50" src = "${d.author.avatar_url}">`
  //       let sha = `Sha: ${d.sha}<br>`
  //       let login = `Login: ${d.author.login }<br>`
  //         return  commitsList +=`<li>${img} Owner: ${owner}<br> ${login} ${sha}</li>`
  //      })
  //      commitsList +="</ul>"
  //      $('#details').html(`${commitsList}`)
  //   })
  //     .catch(function(error){
  //       displayError()
  //     })
  // }

  function displayError(){
    $('#errors').text("I'm sorry, there's been an error. Please try again.")

  }
