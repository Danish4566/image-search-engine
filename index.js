const accessKey = '6pdV7p9w_7go2Yskk4ZPXSt5u8vEFqhn4ibzzNwwG5Q';
const searchForm = document.getElementById('search-form');
const searchbox = document.getElementById('search-box');
const searchresult = document.getElementById('search-result');
const showmorebtn = document.getElementById('show-more-btn');

let keyword = '';
let page = 1;

async function searchimages() {
    keyword = searchbox.value;
    const url =
        `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
    const response = await fetch(url);
    const data = await response.json();
    if (page === 1) {
        searchresult.innerHTML = "";
    }
    const results = data.results;
    results.map((result) => {
        const container = document.createElement('div');
        container.classList.add('image-container');

        const image = document.createElement('img');
        image.src = result.urls.small;

        const imagelink = document.createElement('a');
        imagelink.href = result.links.html;
        imagelink.target = "_blank";
        imagelink.appendChild(image);

        const downloadBtn = document.createElement('a');
        downloadBtn.href = result.urls.raw;
        downloadBtn.download = `image_${result.id}.jpg`; // Set the download attribute with a filename
        downloadBtn.innerHTML = 'Download'; // This will be the text of the button; you can also use an icon here
        downloadBtn.classList.add('download-btn');

        container.appendChild(imagelink);
        container.appendChild(downloadBtn);
        searchresult.appendChild(container);
    });

    showmorebtn.style.display = "block";
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    page = 1;
    searchimages();
});

showmorebtn.addEventListener('click', () => {
    page++;
    searchimages();
});

