$(document).ready(function (){
  console.log('Ready')
});

function searchRepositories() {
  let searchTerms = $("input#searchTerms")[0].value
  // debugger
  let searchTermsArr = searchTerms.trim().split(' ')
  let queryString = "?q=" + searchTermsArr.join("+")
  // debugger
  $.get(`https://api.github.com/search/repositories${queryString}`, function(data){
    //do this on success
    const repoList = '<ul>' + data.items.map(i => {
      // debugger
      return (`
              <li>
                <h2><a href="${i.html_url}">${i.name}</a></h2>
                <p>Description: ${i.description}<p>
                <p>Owner:
                <section>
                  <p>Login: <a href="${i.owner.html_url}">${i.owner.login}</a></p>
                  <img src="${i.owner.avatar_url}" height='32' width='32'>
                </section>
                <a href="#" onclick="showCommits(this); return false;" data-repository="${i.name}" data-owner="${i.owner.login}">Show Commits</a>
              <li>`
            )
    }).join('') + '</ul>';
    debugger
    $("div#results").html(repoList);

  }).fail(displayError)
}

function displayError(){
  $("div#errors").html(`<p>I'm sorry, there's been an error. Please try again."</p>`)
}

function showCommits(el){
  const commitsURL = `https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`
  $.get(commitsURL, function(data){
    debugger;
    const commitList = '<ul>' + data.map(c => {
      return (`
        <li>
          <p>${c.sha}</p>
          <section>
            <p>Login: <a href="${c.author.html_url}">${c.author.login}</a></p>
            <img src="${c.author.avatar_url}" height='32' width='32'>
          </section>
        </li>

      `);
    }).join('') + '</ul>';
    $("div#details").html(commitList)
  })

}
