document.addEventListener('DOMContentLoaded', function() {
    const accessKey = "M7dKHUpy8UaxU4kUCLmXRjJvGdif2E99f3CP89GNMas";

    const searchForm = document.getElementById("search-form");
    const searchBox = document.getElementById("search-box");
    const searchResult = document.getElementById("search-result");
    const searchMoreBtn = document.getElementById("show-more-btn");

    let keyword = "";
    let page = "1";

    async function searchImages() {
        keyword = searchBox.value;
        const url = `https://api.unsplash.com/search/photos?page=${page}&query=${encodeURIComponent(keyword)}&per_page=12`;

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `Client-ID ${accessKey}`
                }
            });
            const data = await response.json();

            if (page == 1) {
                searchResult.innerHTML = "";
            }
            const results = data.results;

            results.map((result) => {
                const image = document.createElement("img");
                image.src = result.urls.small;

                const imageLink = document.createElement("a");
                imageLink.href = `image-details.html?title=${encodeURIComponent(result.alt_description)}&imageURL=${encodeURIComponent(result.urls.regular)}&description=${encodeURIComponent(result.alt_description)}`;

                // Update: Prevent default behavior and navigate to the details page
                imageLink.addEventListener("click", (e) => {
                    e.preventDefault();
                    window.location.href = imageLink.href;
                });

                imageLink.target = "_blank";

                imageLink.appendChild(image);
                searchResult.appendChild(imageLink);
            });
            searchMoreBtn.style.display = "block";
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        page = "1";
        searchImages();
    });

    searchMoreBtn.addEventListener("click", () => {
        page++;
        searchImages();
    });
});
