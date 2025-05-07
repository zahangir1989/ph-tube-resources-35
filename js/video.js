
function getTimeString(time){
    const hour = parseInt(time/3600);
    let remainingSecond = time% 3600;
    const minute = parseInt(remainingSecond % 60);
    remainingSecond = remainingSecond% 60;
    return`${hour} hour ${minute} minute ${remainingSecond} second ago`;
}

const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
        .catch((error) => console.log(error));
};

const loadVideo = () => {
    fetch(" https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) =>displayVideos(data.videos))
    .catch((error) => console.log(error));
}

const displayVideos = (videos) =>{
    const videocontainer = document.getElementById("videos");
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
        video.others.posted_date?.length == 0 ? "" : `<span class="absolute right-2 bottom-2 bg-black text-white rounded p-1">${getTimeString(video.others.posted_date)}</span>`
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
   <p></p>
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
        const button = document.createElement("button");
        button.classList="btn";
        button.innerText = item.category;

        // add button to category container
        categoryContainer.append(button);
    });
};

loadCategories();
loadVideo();
