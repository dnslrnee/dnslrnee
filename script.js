const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');

if (menuToggle && nav) {
  const updateMenuIcon = () => {
    const isOpen = nav.classList.contains('nav-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  };

  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('nav-open');
    updateMenuIcon();
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav-open');
      updateMenuIcon();
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      nav.classList.remove('nav-open');
      updateMenuIcon();
    }
  });
}

if (header) {
  const updateHeaderState = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState);
}

const projectTabs = document.querySelectorAll('.project-tab');
projectTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const tabGroup = tab.closest('.project-tabs');
    if (!tabGroup) return;

    tabGroup.querySelectorAll('.project-tab').forEach((tabItem) => {
      tabItem.classList.toggle('project-tab-active', tabItem === tab);
    });
  });
});

const projectCards = document.querySelectorAll('.project-trigger');
const projectButtons = document.querySelectorAll('.project-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxCounter = document.getElementById('lightbox-counter');
const closeButton = document.querySelector('.lightbox-close');
const prevButton = document.querySelector('.lightbox-prev');
const nextButton = document.querySelector('.lightbox-next');

let galleryImages = [];
let galleryIndex = 0;
let galleryTitle = 'Project';

const parseImages = (value) => {
  if (!value) return [];

  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

const updateLightboxImage = () => {
  if (!lightboxImage || !lightboxTitle || !lightboxCounter) return;

  if (galleryImages.length === 0) return;

  lightboxImage.src = galleryImages[galleryIndex];
  lightboxTitle.textContent = galleryTitle;
  lightboxCounter.textContent = `${galleryIndex + 1} / ${galleryImages.length}`;
};

const openLightbox = (element) => {
  const images = parseImages(element.dataset.images || '');
  const title = element.dataset.title || 'Project';

  if (!lightbox || !lightboxImage || !lightboxTitle || images.length === 0) return;

  galleryImages = images;
  galleryTitle = title;
  galleryIndex = 0;
  updateLightboxImage();
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
};

projectCards.forEach((card) => {
  card.addEventListener('click', () => {
    openLightbox(card);
  });
});

projectButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    openLightbox(button);
  });
});

const creativeGallery = document.getElementById('creative-works-gallery');
const creativePrev = document.querySelector('.creative-works-prev');
const creativeNext = document.querySelector('.creative-works-next');

if (creativeGallery && creativePrev && creativeNext) {
  const scrollCreativeGallery = (direction) => {
    const firstCard = creativeGallery.querySelector('.creative-work-card');
    if (!firstCard) return;

    const cardStyle = window.getComputedStyle(creativeGallery);
    const gap = Number.parseFloat(cardStyle.gap) || 0;
    const cardWidth = firstCard.getBoundingClientRect().width + gap;
    creativeGallery.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth'
    });
  };

  creativePrev.addEventListener('click', () => scrollCreativeGallery(-1));
  creativeNext.addEventListener('click', () => scrollCreativeGallery(1));
}

if (prevButton) {
  prevButton.addEventListener('click', () => {
    if (galleryImages.length === 0) return;
    galleryIndex = (galleryIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
  });
}

if (nextButton) {
  nextButton.addEventListener('click', () => {
    if (galleryImages.length === 0) return;
    galleryIndex = (galleryIndex + 1) % galleryImages.length;
    updateLightboxImage();
  });
}

if (closeButton && lightbox) {
  closeButton.addEventListener('click', () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  });
}

const inquiryForm = document.getElementById('inquiry-form');
const inquirySuccess = document.getElementById('inquiry-success');

if (inquiryForm && inquirySuccess) {
  inquiryForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(inquiryForm);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      service: formData.get('service'),
      message: formData.get('message')
    };

    fetch('https://formsubmit.co/ajax/sarmientodeniselorraine@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then(() => {
        inquirySuccess.classList.add('visible');
        inquiryForm.reset();
      })
      .catch((error) => {
        inquirySuccess.textContent = 'Thank you for reaching out! I’ve received your inquiry and will get back to you soon.';
        inquirySuccess.classList.add('visible');
        console.log(error);
      });
  });
}

const aboutImageSwap = document.querySelector('.about-image-swap');

if (aboutImageSwap) {
  aboutImageSwap.addEventListener('mouseenter', () => {
    aboutImageSwap.classList.add('is-swapped');
  });

  aboutImageSwap.addEventListener('mouseleave', () => {
    if (!aboutImageSwap.classList.contains('is-locked')) {
      aboutImageSwap.classList.remove('is-swapped');
    }
  });

  aboutImageSwap.addEventListener('click', () => {
    aboutImageSwap.classList.toggle('is-swapped');
    aboutImageSwap.classList.toggle('is-locked', aboutImageSwap.classList.contains('is-swapped'));
  });

  aboutImageSwap.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      aboutImageSwap.classList.toggle('is-swapped');
      aboutImageSwap.classList.toggle('is-locked', aboutImageSwap.classList.contains('is-swapped'));
    }
  });
}

if (lightbox) {
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('open')) return;

    if (event.key === 'Escape') {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
    }

    if (event.key === 'ArrowLeft') {
      if (galleryImages.length === 0) return;
      galleryIndex = (galleryIndex - 1 + galleryImages.length) % galleryImages.length;
      updateLightboxImage();
    }

    if (event.key === 'ArrowRight') {
      if (galleryImages.length === 0) return;
      galleryIndex = (galleryIndex + 1) % galleryImages.length;
      updateLightboxImage();
    }
  });
}
