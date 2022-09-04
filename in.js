const lodeAllNews = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/news/categories");
    const data = await response.json();
    return data.data.news_category
}

const setAllmenu = async () => {
    lodeAllNews();
    const data = await lodeAllNews();

    const menu = document.getElementById('all-menu');

    for (const news of data) {
        const li = document.createElement("li");
        li.innerHTML = `<a onclick="updateNews(${news.category_id})" >${news.category_name}</a>
        
        `;
        menu.appendChild(li);
        li.classList.add("mr-16")
    }
}


const updateNews = (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayPost(data.data));
};

const displayPost = updates => {

    // console.log(updates);
    const updateNewsContainer = document.getElementById('new-news');
    updateNewsContainer.textContent = ``;
    updates.forEach(newNews => {

        const newNewsDiv = document.createElement('div');
        const details = newNews.details;
        newNewsDiv.innerHTML = `

        <div class="card card-side bg-base-100 shadow-xl mb-2.5">
                    <figure><img class="object-cover h-80 w-96" src="${newNews.thumbnail_url}" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">${newNews.title}</h2>
                        <p>${details.length > 500 ? details.slice(0, 500) + '...' : details}</p>

                        <div class="flex avatar">
                            <div class="w-10 rounded-full">
                                <img src="${newNews.image_url}"/>
                            </div>
                            <p class="text-xl font-black ml-2">${newNews.author.name}jon</p>
                            <p class="font-black">${newNews.total_view ? newNews.total_view : 'no Viwe founded'}M</p >
                            <label for="my-modal" onclick="showModal('${newNews._id}')" class="btn modal-button">Details</label>
                        </div >
                    </div >
                </div >

    `;
        updateNewsContainer.appendChild(newNewsDiv);
    });
    document.getElementById('dainamic-num').innerText = updates.length ? updates.length : 'no news founds'

}


const showModal = (id) => {
    // console.log(Viwe)
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => modalDisplay(data.data[0]));
}

const modalDisplay = (viws) => {
    const modadBody = document.getElementById('modal-body');
    modadBody.innerHTML = `
    <figure><img class="object-cover h-80 w-96" src="${viws.thumbnail_url}" /></figure>
    <h2 class="card-title">${viws.title}</h2>
    <p>publich-date : ${viws.author.published_date ? viws.author.published_date : 'no published date'}</p>
    `
}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('hidden')
    }
    else {
        loaderSection.classList.add('hidden')
    }
}


setAllmenu();