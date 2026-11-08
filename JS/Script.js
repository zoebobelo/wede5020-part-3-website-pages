const menuBtn = document.getElementById('menuBtn');
const mainNav = document.getElementById('mainNav');
// Function to close the menu
if (menuBtn && mainNav) {
  const closeMenu = () => {
    mainNav.classList.remove('show');
    menuBtn.setAttribute('aria-expanded', 'false');
  };
// Toggle the menu when clicking the menu button
  menuBtn.addEventListener('click', () => {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!isExpanded));
    mainNav.classList.toggle('show', !isExpanded);
  });
// Close the menu when clicking on a navigation link
  mainNav.addEventListener('click', event => {
    if (event.target instanceof Element && event.target.closest('a')) {
      closeMenu();
    }
  });
// Close the menu when pressing the Escape key
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuBtn.focus();
    }
  });

  // Close the menu when resizing the window to a width greater than 768px
  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 769px)').matches) {
      closeMenu();
    }
  });
}

// Fade-in effect for elements
const fadeElements = document.querySelectorAll('.fade-in');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  });
// Observe each fade-in element
  fadeElements.forEach(element => observer.observe(element));
} else {
  fadeElements.forEach(element => element.classList.add('visible'));
}


// Enquiry form submission handling
const enquiryForm = document.querySelector('.enquiry-container form');
if (enquiryForm) {
  const preferredDate = enquiryForm.querySelector('#preferredDate');
  if (preferredDate) {
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);
    preferredDate.min = localToday;
  }

  const messageField = enquiryForm.querySelector('#message');
  const messageCount = enquiryForm.querySelector('#message-count');
  if (messageField && messageCount) {
    const updateMessageCount = () => {
      messageCount.textContent = `${messageField.value.length} / ${messageField.maxLength} characters`;
    };

    messageField.addEventListener('input', updateMessageCount);
    enquiryForm.addEventListener('reset', () => requestAnimationFrame(updateMessageCount));
  }

  
  
  enquiryForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(enquiryForm);
    const details = Array.from(formData.entries())
      .map(([label, value]) => `${label}: ${value}`)
      .join('\n');
    const subject = encodeURIComponent('Photography enquiry');
    const body = encodeURIComponent(details);

    window.location.href = `mailto:Lexhaphotography@gmail.com?subject=${subject}&body=${body}`;
  });
}

const galleryImages = Array.from(document.querySelectorAll('.gallery-photos img'));
if (galleryImages.length && typeof HTMLDialogElement !== 'undefined') {
  const lightbox = document.createElement('dialog');
  lightbox.className = 'gallery-lightbox';
  lightbox.setAttribute('aria-label', 'Image viewer');

  const closeButton = document.createElement('button');
  closeButton.className = 'gallery-lightbox-close';
  closeButton.type = 'button';
  closeButton.setAttribute('aria-label', 'Close image viewer');
  closeButton.textContent = '×';

  const previousButton = document.createElement('button');
  previousButton.className = 'gallery-lightbox-previous';
  previousButton.type = 'button';
  previousButton.setAttribute('aria-label', 'Previous image');
  previousButton.textContent = '‹';

  const nextButton = document.createElement('button');
  nextButton.className = 'gallery-lightbox-next';
  nextButton.type = 'button';
  nextButton.setAttribute('aria-label', 'Next image');
  nextButton.textContent = '›';

  const lightboxImage = document.createElement('img');
  lightboxImage.className = 'gallery-lightbox-image';

  const caption = document.createElement('p');
  caption.className = 'gallery-lightbox-caption';
  caption.setAttribute('aria-live', 'polite');

  lightbox.append(closeButton, previousButton, lightboxImage, caption, nextButton);
  document.body.append(lightbox);

  let activeImageIndex = 0;
  const showImage = index => {
    activeImageIndex = (index + galleryImages.length) % galleryImages.length;
    const image = galleryImages[activeImageIndex];
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    caption.textContent = image.closest('figure')?.querySelector('figcaption')?.textContent.trim() || image.alt;
  };

  galleryImages.forEach((image, index) => {
    const trigger = document.createElement('button');
    trigger.className = 'gallery-image-button';
    trigger.type = 'button';
    trigger.setAttribute('aria-label', `View image: ${image.alt}`);
    image.before(trigger);
    trigger.append(image);
    trigger.addEventListener('click', () => {
      showImage(index);
      lightbox.showModal();
      closeButton.focus();
    });
  });

  closeButton.addEventListener('click', () => lightbox.close());
  previousButton.addEventListener('click', () => showImage(activeImageIndex - 1));
  nextButton.addEventListener('click', () => showImage(activeImageIndex + 1));
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) {
      lightbox.close();
    }
  });
  lightbox.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {
      showImage(activeImageIndex - 1);
    } else if (event.key === 'ArrowRight') {
      showImage(activeImageIndex + 1);
    }
  });
}

document.documentElement.classList.add('js');