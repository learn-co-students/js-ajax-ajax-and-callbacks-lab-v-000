// function searchRepositories() {
//   const searchTerm = $('#searchTerms').val();
//   console.log(searchTerm);
  // $.get(`https://api.github.com/search/repositories?q=${searchTerm}`, response => {
  //   console.log(response);
  // }).fail(function(error) {
  //   console.log('Something went wrong: ' + error.statusText);
  // });
// }

function searchRepositories() {
  const searchTerm = $('#searchTerms').val();
  // console.log(searchTerm);
  $.ajax({
    // type: 'GET',
    crossOrigin: true,
    url: `https://api.github.com/search/repositories?q=${searchTerm}`,
    // headers: {
    //   "Access-Control-Allow-Origin": "*"
    // },
    // dataType : 'jsonp',
    // jsonpCallback : "jsoncallback",
    // xhrFields: {
    //   withCredentials: true
    // },
    success: function(response) {
      // response.setHeader("Access-Control-Allow-Credentials", "true")
      console.log('hello')
      console.log(response);
    },
    error: error => {
      console.log(error);
    }
  });
}


// $(document).ready(function (){
// });
