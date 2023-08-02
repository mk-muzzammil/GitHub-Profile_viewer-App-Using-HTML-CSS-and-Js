const url = "https://api.github.com/users";
let jsonData;

//=============================needed Selectors ================================
const avatarImage=document.querySelector("#myAvatarImage");
const profileName=document.querySelector("#name");
const userName=document.querySelector("#Username");
const aboutPara=document.querySelector("#about-paragraph");
const followerSpan=document.querySelector("#followersSpan");
const followingSpan=document.querySelector("#followingSpan");
const repoSpan=document.querySelector("#repoSpan");

const searchButton=document.querySelector("#searchButton");
const searchBar=document.querySelector("#searchbar");
const profileContainer=document.querySelector(".profileContainer");
const loadingEle=document.querySelector(".loading");


// =======================================First way to do this ================================

const generateProfile= (profile) => {
  return `
  <section class="Secondary-cardContainer">
  <div class="topNavBar">
    <div class="left-avatarContainer">
      <div class="avatarImage">
        <img id="myAvatarImage" src="${profile.avatar_url}" alt="ProfilePhoto"/>
      </div>
      <div class="selfInstructionDiv">
        <h1 id="name" class="secondary-Heading">${profile.name}</h1>
        <h3 id="Username" class="secondary-Heading">${profile.login}</h3>
      </div>

    </div>

    <div class="right-anchorContainer">
      <a href="${profile.html_url}" target="_black" id="profileViewLink">Check Profile </a>

    </div>


  </div>

  <div class="aboutSection">
    <h1 id="aboutHeading" class="primary-heading">About</h1>
    <p class="Infoparagraph" id="about-paragraph">${profile.bio}</p>
  </div>
  
  <div class="statusSection">
    <div class="Div followerDiv">
      <h3 id="followersheading" class="secondary-Heading">Followers</h3>
      <span class="statusValue" id="followersSpan">${profile.followers}</span>
    </div>
    <div class="Div followingsDiv">
      <h3 id="followingssheading" class="secondary-Heading">Followings</h3>
      <span class="statusValue" id="followingSpan">${profile.following}</span>
    </div>
    <div class="Div ReposDiv">
      <h3 id="Reposheading" class="secondary-Heading">Repos</h3>
      <span class="statusValue" id="repoSpan">${profile.public_repos}</span>
    </div>


  </div>

</section>`;

};


const fetchGitHubdata=async () =>{
  const username=searchBar.value;

  loadingEle.innerText="loading....";
  loadingEle.style.color='black'; 
  try {
    const data = await fetch(`${url}/${username}`);
    jsonData = await data.json();

    if(jsonData.bio){
      loadingEle.innerHTML="";
      profileContainer.innerHTML=generateProfile(jsonData);

    }
    else{
      loadingEle.innerText="Not Found";
      loadingEle.style.color='red'; 
      // very imp bcz if not found in this case profileContainer must empty 
      profileContainer.innerText="";

    }
  
  }
   catch (error) {
    console.log({ error });
    loadingEle.innerText="";

  }
}



// =======================================Second Way to do this ================================
// const fetchGitHubdata = async () => {
//   const username=searchBar.value;

//   try {
//     const data = await fetch(`${url}/${username}`);
//     jsonData = await data.json();

    
//     // ====================Replacing(concept) existing textNode with mine=================
//     avatarImage.setAttribute("src",jsonData.avatar_url);
//     // ==============Way 1 to change inner Text ==================
//     profileName.replaceWith(document.createTextNode(`${jsonData.name}`));
//     // ==============Way 2 to change inner Text ==================
//     userName.innerHTML=jsonData.login;

//     aboutPara.replaceWith(document.createTextNode(`${jsonData.bio}`));
    
//     followerSpan.replaceWith(document.createTextNode(`${jsonData.followers}`));
//     followingSpan.replaceWith(document.createTextNode(`${jsonData.following}`));
//     repoSpan.replaceWith(document.createTextNode(`${jsonData.public_repos}`));
    






//   }
//    catch (error) {
//     console.log("E:", error);
//   }
// };

searchButton.addEventListener("click",fetchGitHubdata);


 