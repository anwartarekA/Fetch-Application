// Set Variables
let input_repos = document.querySelector('input');
let button_reops = document.querySelector('.get-repos');
let repos_content = document.querySelector('.repos-content');

// create function to get the reposistories
button_reops.onclick = function()
{
    GetRepos();
}
function GetRepos()
{
    if(input_repos.value == '')
    {
        repos_content.innerHTML = `<span class="empty">input should not be empty</span>`;
    }
    else
    {
        fetch(`https://api.github.com/users/${input_repos.value}/repos`)
        .then((resolve)=> resolve.json())
        .then(repos=>{
            // Empty the container content
            repos_content.innerHTML='';
            repos.forEach(repo=>{
               // create the container of repo
               let mainDiv = document.createElement('div');
               // create the sapn for main text
               let mainspan = document.createElement('span');
               // create class for main span
               mainspan.className = 'mainspan';
               // create text node for the main div
               let spanText = document.createTextNode(repo.name);
               // append the span text in main span
                mainspan.appendChild(spanText);
               // appind text in the main div
                mainDiv.appendChild(mainspan);
               // create the link for each repo
               let TheURL = document.createElement('a');
               // create the href for each anchor
               TheURL.href = `https://github.com/${input_repos.value}/${repo.name}`;
               // create the target for the anchor
               TheURL.setAttribute('target','_blank');
               // create the text for the anchor
               let URLText = document.createTextNode('visit');
               // appind the text of anchor in the a anchor
               TheURL.appendChild(URLText); 
               // appind the url in the main div
               mainDiv.appendChild(TheURL);
               // create the div for the star
               let starDiv = document.createElement('span');
               // create class for the star div
               starDiv.className = 'Star';
               // create the text for the star div
               let countStars = document.createTextNode(`${repo.stargazers_count} star`); 
               // appind the star text in the star div
                starDiv.appendChild(countStars);
               // appind the star div in the Main Div
                mainDiv.appendChild(starDiv);
               // add class to Main Div
               mainDiv.className = 'repo-box';
               // appind the main div in the content container
               repos_content.appendChild(mainDiv);
            })
        });
    }
}
