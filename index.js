$(document).ready(function (){
});

let searchterm = document.getElementbyId('searchTerms').value
$.get(`https://api.github.com/search/repositories?q=${searchterms}`, data => {$("#results").html(


)}
