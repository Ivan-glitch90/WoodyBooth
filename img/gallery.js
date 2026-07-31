// ============================================================
// HOW TO ADD NEW EVENT PHOTOS:
// 1. Drop your photo files into the img/gallery/ folder
// 2. Add each filename to the list below, in quotes, separated by commas
// That's it — the grid and lightbox update automatically.
// ============================================================
const galleryPhotos = [
  "img/gallery/event1.jpg",
  "img/gallery/event2.jpg",
  "img/gallery/event3.jpg",
  "img/gallery/event4.jpg",
  "img/gallery/event5.jpg",
  "img/gallery/event6.jpg",
];

const galleryGrid = document.getElementById("galleryGrid");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxModalEl = document.getElementById("lightboxModal");
let lightboxModal;
let currentPhotoIndex = 0;

function renderGallery() {
  galleryPhotos.forEach((src, index) => {
    const item = document.createElement("div");
    item.className = "gallery-item";
    item.setAttribute("data-bs-toggle", "modal");
    item.setAttribute("data-bs-target", "#lightboxModal");
    item.setAttribute("role", "button");
    item.setAttribute("tabindex", "0");
    item.setAttribute("aria-label", "View photo " + (index + 1) + " full size");

    const img = document.createElement("img");
    img.src = src;
    img.alt = "Woody Booth event photo " + (index + 1);
    img.loading = "lazy";

    item.appendChild(img);
    item.addEventListener("click", () => openLightbox(index));
    item.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") openLightbox(index);
    });

    galleryGrid.appendChild(item);
  });
}

function openLightbox(index) {
  currentPhotoIndex = index;
  lightboxImage.src = galleryPhotos[currentPhotoIndex];
}

function showNextPhoto() {
  currentPhotoIndex = (currentPhotoIndex + 1) % galleryPhotos.length;
  lightboxImage.src = galleryPhotos[currentPhotoIndex];
}

function showPrevPhoto() {
  currentPhotoIndex = (currentPhotoIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
  lightboxImage.src = galleryPhotos[currentPhotoIndex];
}

document.addEventListener("DOMContentLoaded", () => {
  renderGallery();
  lightboxModal = new bootstrap.Modal(lightboxModalEl);

  document.querySelector(".lightbox-next").addEventListener("click", showNextPhoto);
  document.querySelector(".lightbox-prev").addEventListener("click", showPrevPhoto);

  // Allow left/right arrow keys while the lightbox is open
  document.addEventListener("keydown", (e) => {
    if (!lightboxModalEl.classList.contains("show")) return;
    if (e.key === "ArrowRight") showNextPhoto();
    if (e.key === "ArrowLeft") showPrevPhoto();
  });
});
