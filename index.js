var displayError = () => $('#errors').html("I'm sorry, there's been an error. Please try again.")

var renderCommit = (commit) => {
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

var renderSearchResult = (result) => {
  return `<div>
        <h3><a href="${result.html_url}">${result.name}</a></h3>
        <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
        <p>${result.description}</p>
      </div>
      <hr>`
}

var renderSearchResults = (data) => data.items.map( result => renderSearchResult(result))

var searchRepositories = () => {
  const searchTerms = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
      $('#results').html(renderSearchResults(data))
    }).fail(error => {
      displayError()
    })
}

// function searchRepositories() {
//   // const uri = "https://api.github.com/search/repositories?q="
//   let searchString = document.getElementById("search-terms").value
//   let searchTerms = searchString.replace(/[^\w\s]|_/g, "").replace(/\s+/g, "+");
//   console.log(searchTerms)
//   // let fullUrl = uri + searchTerms
//   // console.log(fullUrl)
//   // document.getElementById("details").innerHTML = "testing"
//   $.getJSON('https://api.github.com/search/repositories?q=' + searchTerms, function(json_data){
//       console.log(json_data.items)
//       let itemGroup = json_data.items
//
//       // let resultList = `<ul>${itemGroup.map(item =>
//       //   '<li><strong>' + "Repo name: " + item.name  + '</strong><br> - '
//       //   + "Repo owner: " + item.owner.login + '<br>'
//       //   + "Repo URL: " + item.html_url
//       //   + '</li>')
//       //   .join('')}</ul>`
//       //   )
//
//       $("#results").html("<strong>Total results</strong>: " + json_data.total_count + `<ul>${itemGroup.map(item =>
//         '<strong>' + "Repo name: " + item.name  + '</strong><br> '
//         + "Repo owner: " + item.owner.login + '<br>'
//         + "Repo URL: " + `<a href="${item.html_url}">${item.html_url} </a>` + '<br>'
//         + '<a href=#" onclick="showCommits(this)">Show Commits</a>'
//         + '<br><br>')
//         .join('')}</ul>`
//         )
//
//       });

  // $.get(fullUrl), function(response) {
  //   console.log(response)
  //   $(".details").html(response);
  // }

//}


$(document).ready(function (){
  console.log("HEY GIRL")

});
