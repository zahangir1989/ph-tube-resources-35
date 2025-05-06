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

const cardDemo =
    {
        category_id: "1001",
        video_id: "aaal",
        thumbnail: "https://i.ibb.co/hdtZYbB/enchnting.jpg",
        title: "Enchanted Harmonies",
        authors: [
            {
                profile_picture: "https://i.ibb.co/jh1q2F3/shopia.jpg",
                profile_name: "Sophia Williams",
                verified: false
            }
        ],
        others: {
            "views": "7.6K",
            "posted_date": "16450"
        },
        description: "'Enchanted Harmonies' by Sophia Williams enchants listeners with its delicate, soothing sounds and melodic complexity. Garnering 7.6K views, this piece is perfect for those seeking an immersive musical experience that blends elegance with emotion, offering a unique soundscape that resonates deeply with its audience."
    }

const displayVideos = (videos) =>{
    const videocontainer = document.getElementById("videos");
   videos.forEach((video) => {
    console.log(video);
    const card = document.createElement("div");
    card.classList ="card caed-compact";
    card.innerHTML = `
      <figure class="h-[200px]">
    <img
      src=${video.thumbnail}
      class="h-full w-full object-cover"
      alt="Shoes" />
  </figure>
  <div class="flex gap-2 px-0 py-2">
   <div>
   <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture} alt="">
   </div>
   <div>
   <h2 class="font-bold">${video.title}</h2>
   <div class="flex items-center gap-2">
   <p class="text-gray-400">${video.authors[0].profile_name}</p>
   <img class="w-5" src="https://img.icons8.com/?size=96&id=63760&format=png"/>
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
