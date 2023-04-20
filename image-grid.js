// Blank while loading
window.addEventListener("load", function () {
  const loader = document.getElementById("loading");
  loader.classList.add("hide");
});

const cid = "QmeL5MQmsdejM1caUJRB9gRHXAduZQ6Zf7ajtA19GN35tP";
const urlFormat = "https://ipfs.io/ipfs/" + cid + "/";
const container = document.querySelector(".container");
const numImagesPerBatch = 36;
let startIndex = 0;
let loadedImages = new Set();
let imageCache = {};

// Create an IntersectionObserver instance
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !loadedImages.has(entry.target.dataset.index)) {
      // Load the image and store it in the cache
      const img = entry.target;
      img.src = urlFormat + (parseInt(img.dataset.index) + 1) + ".png";
      img.loading = "lazy"; // add lazy loading attribute
      loadedImages.add(parseInt(img.dataset.index));
      imageCache[parseInt(img.dataset.index)] = img;
      // Disable right-click context menu on the image
      img.addEventListener('contextmenu', e => {
        e.preventDefault();});
    }
  });
});

// Load the initial batch of images
for (let i = startIndex; i < startIndex + numImagesPerBatch; i++) {
  const img = document.createElement("img");
  img.dataset.index = i;
  img.loading = "lazy"; // add lazy loading attribute
  observer.observe(img); // observe the image element
  container.appendChild(img);
}

// Update the start index for the next batch
startIndex += numImagesPerBatch;

// Listen for the scroll event and load more images as needed
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY || window.pageYOffset;
  const threshold = document.documentElement.scrollHeight - window.innerHeight;

  if (scrollY >= threshold) {
    // Load the next batch of images
    for (let i = startIndex; i < startIndex + numImagesPerBatch; i++) {
      if (!loadedImages.has(i)) {
        const img = document.createElement("img");
        img.dataset.index = i;
        img.loading = "lazy"; // Add lazy loading attribute
        observer.observe(img); // observe the image element
        container.appendChild(img);
      }
    }

    // Update the start index for the next batch
    startIndex += numImagesPerBatch;
  }
});

// Restore images from cache on page reload
window.addEventListener("load", () => {
  const cachedImages = Object.values(imageCache);
  container.append(...cachedImages);
});
