$(button).on('click', function(){
  console.log(data)
})

$.get({
  url : 'https://api.github.com/repositories',
  type : 'GET'
  })
.done(function(data) {
  console.log(data)
})

$(document).ready(function (){
});
