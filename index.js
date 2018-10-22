// $(document).ready(function (){

  function searchRepositories() {
    const input = document.querySelector('input#searchTerms').value;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayRepositories);
    req.open('GET', 'https://api.github.com/search/repositories?q=' + input)
    // req.open('GET', 'https://doesnotexist.com' + input)

    req.send();
  }

  function displayRepositories() {
    const repos = JSON.parse(this.responseText);
    console.log(repos);
    const repoList = `<ul>${repos.items
      .map(
        r =>
            '<li>' +
              '<p>' +
              '<img src="' + r.owner.avatar_url + '" alt="' + r.owner.login + '" width="50" height="50" />' +
              '</p>' +
              '<p><strong> Name: </strong>' +
              '<a href="' + r.html_url + '">' + r.name + '</a>' +
              '</p>' +
              //ADD LINK
              '<p><strong> Description: </strong>' +
              r.description +
              '</p>' +
              '<p><strong> Owner (username): </strong>' +
              '<a href="https://github.com/' + r.owner.login + '">' + r.owner.login + '</a>' +
              '</p>' +
              '<a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getCommits(this)"> Get Commits </a>' +
            '</li>'
            )
          .join('')}</ul>`;
          document.getElementById('results').innerHTML = repoList;
  }

  function getCommits(el) {
    const name = el.dataset.repository;
    const user = el.dataset.username;
    const req = new XMLHttpRequest();
    req.addEventListener('load', showCommits);
    req.open('GET', 'https://api.github.com/repos/' + user + '/' + name + '/commits');
    req.send();
  }

  function showCommits() {
    const commits = JSON.parse(this.responseText);
    const commitsList = `<ul>${commits
      .map(
        commit =>
        '<li>'+
          '<img src="' + commit.author.avatar_url + '" alt="' + commit.commit.author.name + '" width="50" height="50" />' +
          '<p><strong> SHA: ' +
          commit.commit.tree.sha +
          '</p>' +
          '<p><strong> Author: ' +
          commit.commit.author.name +
          '</p>' +
          '<p><strong> Username: ' +
          '<a href="https://github.com/' + commit.author.login + '">' + commit.author.login + '</a>' +
          '</p>' +
        '</li>'
      ).join('')}</ul>`;
      document.getElementById('details').innerHTML = commitsList;
  }
  function displayErrors() {
    document.getElementById('errors').innerHTML = "I'm sorry, there's been an error. Please try again.";
  }

  if(searchRepositories() === undefined) {
      displayErrors();
  };

// })
