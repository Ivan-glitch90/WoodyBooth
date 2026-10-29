// ============================================================
// HOW TO ADD NEW EVENT PHOTOS:
// 1. Drop your photo file into the img/gallery/ folder
//    (tip: resize it to about 1600px wide first)
// 2. Add an entry to the galleryPhotos array below:
//      {
//        src: "img/gallery/yourfile.jpg",
//        alt: "A short, specific description of the photo",
//        cat: "wedding" | "corporate" | "festival" | "booth" | "product",
//        tall: true  (optional: use for portrait-orientation
//                     photos so the grid gives them extra height
//                     instead of cropping them into a square)
//      }
// The grid, filters, and lightbox all update automatically.
// Tip: the order below was chosen so the grid has no gaps at desktop, tablet
// and phone widths. If you add or move photos, check the gallery at all three sizes.
// Filter buttons with no photos in them are hidden automatically.
// Photos with cat: "product" (printed strips) are shown in full, never cropped.
// ============================================================
const galleryPhotos = [
  {
    src: "img/gallery/wedding-couple-instagram-frame.jpg",
    alt: "Bride and groom holding a Woody Booth Instagram-style frame in front of the vintage trailer",
    cat: "wedding",
    tall: true,
  },
  {
    src: "img/gallery/trailer-day-wide.jpg",
    alt: "Woody Booth trailer in the sunshine with the Woody Mail box, red carpet, umbrella and director's chairs",
    cat: "booth",
  },
  {
    src: "img/gallery/guests-night-tongues.jpg",
    alt: "Guests in suits making silly faces inside the trailer booth under the glowing PHOTOS sign",
    cat: "wedding",
    tall: true,
  },
  {
    src: "img/gallery/trailer-front-red-carpet.jpg",
    alt: "Woody Booth vintage wood trailer with its PHOTOS marquee sign, open door and red carpet entrance",
    cat: "booth",
  },
  {
    src: "img/gallery/guests-hats-smiling.jpg",
    alt: "Guests laughing together in costume hats inside the Woody Booth trailer",
    cat: "wedding",
    tall: true,
  },
  {
    src: "img/gallery/couple-in-booth-doorway.jpg",
    alt: "Couple smiling together inside the trailer booth, with printed strips displayed in the window and the PHOTOS sign above",
    cat: "wedding",
    tall: true,
  },
  {
    src: "img/gallery/friends-instagram-frame-trailer.jpg",
    alt: "Two friends in suits holding a Woody.Booth Instagram-style frame in front of the trailer and red carpet",
    cat: "wedding",
    tall: true,
  },
  {
    src: "img/gallery/corporate-circus-ticket-booth.jpg",
    alt: "Circus-themed Woody Booth ticket booth with a performer on stilts and guests in costume at a corporate event",
    cat: "corporate",
    tall: true,
  },
  {
    src: "img/gallery/strip-black-white-captain-hats.jpg",
    alt: "Black and white printed photo strip of three friends in captain hats and sunglasses with a champagne bottle prop",
    cat: "product",
  },
  {
    src: "img/gallery/trailer-night-glow.jpg",
    alt: "The Woody Booth trailer glowing at night with the lit PHOTOS sign and string lights",
    cat: "booth",
  },
  {
    src: "img/gallery/couple-instagram-frame-kiss.jpg",
    alt: "Couple sharing a kiss on the cheek behind a Woody.Booth Instagram-style frame",
    cat: "wedding",
    tall: true,
  },
  {
    src: "img/gallery/strip-suits-ukulele.jpg",
    alt: "Printed photo strip of friends in suits with a ukulele and sunglasses props in front of a floral wall and neon sign",
    cat: "product",
  },
  {
    src: "img/gallery/woody-mail-closeup.jpg",
    alt: "Close-up of the Woody Mail box with the trailer behind it",
    cat: "booth",
    tall: true,
  },
  {
    src: "img/gallery/two-women-in-booth.jpg",
    alt: "Two women smiling together inside the trailer booth",
    cat: "wedding",
    tall: true,
  },
  {
    src: "img/gallery/strip1.jpg",
    alt: "Printed 2x6 photo strip of four friends posing with props in the booth",
    cat: "product",
  },
  {
    src: "img/gallery/corporate-carnival-woody-wall.jpg",
    alt: "Carnival-themed Woody Wall with a custom neon sign, striped balloons and carnival props at a corporate event",
    cat: "corporate",
  },
  {
    src: "img/gallery/couple-instagram-frame-silly.jpg",
    alt: "Couple making funny faces behind a Woody.Booth Instagram-style frame",
    cat: "wedding",
    tall: true,
  },
  {
    src: "img/gallery/guests-peace-signs.jpg",
    alt: "Four guests in oversized sunglasses making peace signs inside the booth",
    cat: "wedding",
    tall: true,
  },
  {
    src: "img/gallery/logo-string-lights.jpg",
    alt: "Woody Booth round logo sticker surrounded by warm string lights",
    cat: "booth",
  },
];

// Friendly labels for the little tag on each photo
const categoryLabels = {
  wedding: "Wedding",
  corporate: "Corporate",
  festival: "Festival",
  booth: "The booth",
  product: "Printed strip",
};

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
    item.className = "gallery-item" + (photo.tall ? " tall" : "") + (photo.cat === "product" ? " strip" : "");
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
    tag.textContent = categoryLabels[photo.cat] || photo.cat;

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

  // Hide filter buttons that have no photos yet
  filterButtons.forEach((btn) => {
    const filter = btn.dataset.filter;
    if (filter !== "all" && !galleryPhotos.some((p) => p.cat === filter)) {
      btn.hidden = true;
    }
  });

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
