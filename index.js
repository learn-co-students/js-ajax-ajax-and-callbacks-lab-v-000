$(document).ready(function (){
});


function getRepositories(){
  const req = new XMLHttpRequest()
  req.addEventListener('load', showRepositories);
}
