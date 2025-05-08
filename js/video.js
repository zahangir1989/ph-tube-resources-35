
function getTimeString(time){
    const hour = parseInt(time/3600);
    let remainingSecond = time% 3600;
    const minute = parseInt(remainingSecond % 60);
    remainingSecond = remainingSecond% 60;
    return`${hour} hour ${minute} minute ${remainingSecond} second ago`;
}

const removeActiveClass = () =>{
    const buttons = document.getElementsByClassName('category-btn');
    console.log(buttons);

    for(let btn of buttons){
     btn.classList.remove("active")
    }
}

const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
        .catch((error) => console.log(error));
};

const loadVideo = (searchText="") => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${seachText}`)
    .then((res) => res.json())
    .then((data) =>displayVideos(data.videos))
    .catch((error) => console.log(error));
}

 const loadCategoryVideos = (id) =>{
//   alert(id);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) =>  {

        // active button
        removeActiveClass();


        const activeBtn = document.getElementById(`btn-${id}`);
        activeBtn.classList.add("active");
        // console.log(activeBtn)
        displayVideos(data.category);
    })
    .catch((error) => console.log(error));
 }

 const loadDetails = async(videoId) => {
    console.log(videoId);
    const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(uri);
    const data = await res.json();
    displayDetails(data.video)

 };

 const displayDetails = (video) =>{
    console.log(video);
    const detailsContainer = document.getElementById("modal-content")
    detailsContainer.innerHTML=`
    <img src=${video.thumbnail} />
    <p>${video.description}</p>
    `
    document.getElementById("showModal").click();

 }

const displayVideos = (videos) =>{
    const videocontainer = document.getElementById("videos");
    videocontainer.innerHTML = "";

    if(videos.length == 0){
        videocontainer.classList.remove("grid")
        videocontainer.innerHTML = `
        <div class="min-h-[300px] w-full flex flex-col gap-5 justify-center items-center">
        <img src="assets/Icon.png"/>
        <h2 class="text-center text-xl font-bold">
        No Content Here in this Category</h2>
        </div>
        `;
        return;
    }
    else{
        videocontainer.classList.add("grid") 
    }

   videos.forEach((video) => {
    console.log(video);
    const card = document.createElement("div");
    card.classList ="card caed-compact";
    card.innerHTML = `
      <figure class="h-[200px] relative">
    <img
      src=${video.thumbnail}
      class="h-full w-full object-cover"
      alt="Shoes" />
      ${
        video.others.posted_date?.length == 0 ? "" 
        : `<span class="absolute text-xs right-2 bottom-2 bg-black text-white rounded p-1">${getTimeString(video.others.posted_date)}</span>`
      }
      
  </figure>
  <div class="flex gap-2 px-0 py-2">
   <div>
   <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture} alt="">
   </div>
   <div>
   <h2 class="font-bold">${video.title}</h2>
   <div class="flex items-center gap-2">
   <p class="text-gray-400">${video.authors[0].profile_name}</p>
  ${video.authors[0].verified == true ? '<img class="w-5" src="https://img.icons8.com/?size=96&id=63760&format=png"/>': ""}
   </div>
   <p> <button onclick="loadDetails('${video.video_id}')"class="btn btn-sm btn-error">details</button></p>
   </div>
   
  </div>;
    `;
    videocontainer.append(card);

   })

}

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories");
    categories.forEach((item) => {
        console.log(item);

        // create button
        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML = `
        <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">
        ${item.category}
        </button>
        `
        // button.classList="btn";
        // button.innerText = item.category;
        // button.onclick = () => {   ababeo kora jai
        //     alert('hello')
        // } 

        // add button to category container
        categoryContainer.append(buttonContainer);
    });
};

document.getElementById("search-input").addEventListener("keyup", (e) => {
    loadVideo(e.target.value);
});

loadCategories();
loadVideo();
