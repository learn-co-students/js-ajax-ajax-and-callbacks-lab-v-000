function searchRepositories() {
   const searchTerms = document.getElementById('searchTerms').value;
   $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(response) {
     const template = document.getElementById('repos-template').innerHTML
     const templateFn = Handlebars.compile(template)
     document.getElementById('results').innerHTML = templateFn(response.items)
   }).fail(function(error) {
     displayError(error)
   })
 }

 function showCommits(el) {
   const url = el.dataset.commitsurl.replace(/{.*}$/g, '')
   $.get(url, function(response) {
     console.log(response);
     const template = document.getElementById('commits-template').innerHTML
     const templateFn = Handlebars.compile(template)
     document.getElementById('details').innerHTML = templateFn(response)
   }).fail(function(error) {
     displayError(error)
   })
 }

 function displayError(error) {
   console.log(error);
   document.getElementById('errors').innerHTML = "I'm sorry, there's been an error. Please try again. Check the console for more information."
 }
$(document).ready(function (){
});
