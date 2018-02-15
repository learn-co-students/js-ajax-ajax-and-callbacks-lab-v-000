// We should wait for the page to load before running our Ajax request
$(document).ready(function(){
  // Now we start the Ajax GET request. The first parameter is the URL with the data.
  // The second parameter is a function that handles the response.
  $.get("https://developer.github.com/v3/", function(response) {
    // Here we are getting the element on the page with the id of sentences and
    // inserting the response
    $("#searchTerms").html(response);
  });
});
