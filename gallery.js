// ============================================================
// HOW TO ADD NEW EVENT PHOTOS:
// 1. Drop your photo file into the img/gallery/ folder
// 2. Add an entry to the galleryPhotos array below:
//      {
//        src: "img/gallery/yourfile.jpg",
//        alt: "A short, specific description of the photo",
//        cat: "wedding" | "corporate" | "festival" | "product",
//        tall: true  (optional — use for portrait-orientation
//                     photos so the grid gives them extra height
//                     instead of cropping them into a square)
//      }
// The grid, filters, and lightbox all update automatically.
// ============================================================
const galleryPhotos = [
  {
    src: "img/gallery/event1.jpg",
    alt: "Woody Booth event photo",
    cat: "wedding",
    tall: true,
  },
  {
    src: "img/gallery/event2.jpg",
    alt: "Woody Booth event photo",
    cat: "corporate",
  },
  {
    src: "img/gallery/event3.jpg",
    alt: "Woody Booth event photo",
    cat: "festival",
    tall: true,
  },
  {
    src: "img/gallery/event4.jpg",
    alt: "Woody Booth event photo",
    cat: "wedding",
  },
  {
    src: "img/gallery/event5.jpg",
    alt: "Woody Booth event photo",
    cat: "corporate",
    tall: true,
  },
  {
    src: "img/gallery/event6.jpg",
    alt: "Woody Booth event photo",
    cat: "festival",
  },
  // Once you have a real scan of a printed strip, add it here with
  // cat: "product" so it shows up under the "Printed Strips" filter.
  // {
  //   src: "img/gallery/strip1.jpg",
  //   alt: "Printed 2x6 photo strip from a Woody Booth wedding session",
  //   cat: "product",
  // },
];

const galleryGrid = document.getElementById("galleryGrid");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxCounter = document.getElementById("lightboxCounter");
const lightboxModalEl = document.getElementById("lightboxModal");
const filterButtons = document.querySelectorAll(".filter-btn");

let lightboxModal;
let currentPhotoIndex = 0;
let visibleIndices = galleryPhotos.map((_, i) => i);

function renderGallery() {
  galleryPhotos.forEach((photo, index) => {
    const item = document.createElement("div");
    item.className = "gallery-item" + (photo.tall ? " tall" : "");
    item.dataset.cat = photo.cat;
    item.setAttribute("data-bs-toggle", "modal");
    item.setAttribute("data-bs-target", "#lightboxModal");
    item.setAttribute("role", "button");
    item.setAttribute("tabindex", "0");
    item.setAttribute("aria-label", "View photo: " + photo.alt);

    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.alt;
    img.loading = "lazy";

    const tag = document.createElement("span");
    tag.className = "gallery-tag";
    tag.textContent = photo.cat;

    item.appendChild(img);
    item.appendChild(tag);
    item.addEventListener("click", () => openLightbox(index));
    item.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") openLightbox(index);
    });

    galleryGrid.appendChild(item);
  });
}

function openLightbox(index) {
  currentPhotoIndex = index;
  renderLightbox();
}

function renderLightbox() {
  const photo = galleryPhotos[currentPhotoIndex];
  lightboxImage.src = photo.src;
  lightboxImage.alt = photo.alt;
  lightboxCaption.textContent = photo.alt;

  const position = visibleIndices.indexOf(currentPhotoIndex) + 1;
  lightboxCounter.textContent = position + " of " + visibleIndices.length;
}

function showNextPhoto() {
  let pos = visibleIndices.indexOf(currentPhotoIndex);
  pos = (pos + 1) % visibleIndices.length;
  currentPhotoIndex = visibleIndices[pos];
  renderLightbox();
}

function showPrevPhoto() {
  let pos = visibleIndices.indexOf(currentPhotoIndex);
  pos = (pos - 1 + visibleIndices.length) % visibleIndices.length;
  currentPhotoIndex = visibleIndices[pos];
  renderLightbox();
}

function applyFilter(filter) {
  visibleIndices = [];
  const items = galleryGrid.querySelectorAll(".gallery-item");

  items.forEach((item, index) => {
    const show = filter === "all" || item.dataset.cat === filter;
    item.classList.toggle("hidden", !show);
    if (show) visibleIndices.push(index);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderGallery();
  lightboxModal = new bootstrap.Modal(lightboxModalEl);

  document.querySelector(".lightbox-next").addEventListener("click", showNextPhoto);
  document.querySelector(".lightbox-prev").addEventListener("click", showPrevPhoto);

  // Arrow keys while the lightbox is open
  document.addEventListener("keydown", (e) => {
    if (!lightboxModalEl.classList.contains("show")) return;
    if (e.key === "ArrowRight") showNextPhoto();
    if (e.key === "ArrowLeft") showPrevPhoto();
  });

  // Swipe left/right on touch devices
  let touchStartX = 0;
  lightboxImage.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });
  lightboxImage.addEventListener("touchend", (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    const swipeThreshold = 50;
    if (deltaX > swipeThreshold) showPrevPhoto();
    else if (deltaX < -swipeThreshold) showNextPhoto();
  });

  // Filter tabs
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      applyFilter(btn.dataset.filter);
    });
  });
});
