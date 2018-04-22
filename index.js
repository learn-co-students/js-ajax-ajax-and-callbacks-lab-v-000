$(document).ready(function (){ });
  //https://api.github.com/search/repositories?q=topic:ruby+topic:rails
  // $("#form").submit(function( event ) {
  //    const $query = $("input:first").val()
  //    console.log($query)
  // });

   const searchRepsitories = () => {
       const searchTerms = $('#searchTerms').val()
       $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
           $('#results').html(renderSearchResults(data))
         }).fail(error => {
           displayError()
         })

    var renderSearchResult = (result) => {
      return `
        <div>
          <h2><a href="${result.html_url}">${result.name}</a></h2>
          <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
          <p>${result.description}</p>
        </div>
        <hr>
      `
      }

    var renderSearchResults = (data) => data.items.map( result => renderSearchResult(result))
   }
