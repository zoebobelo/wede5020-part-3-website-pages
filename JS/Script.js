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


const enquiryForm = document.querySelector('.enquiry-form');
if (enquiryForm) {
  const preferredDate = enquiryForm.querySelector('#preferredDate');
  if (preferredDate) {
    const today = new Date();
    preferredDate.min = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);
  }

  const serviceType = enquiryForm.querySelector('#serviceType');
  const response = enquiryForm.querySelector('#enquiry-response');
  const updateEnquiryResponse = () => {
    const service = serviceType.value;
    const date = preferredDate.value;
    response.textContent = service
      ? `Thanks for your interest in ${service.toLowerCase()}${date ? ` on ${date}` : ''}. We will confirm availability for your requested date and location and provide a quote by email.`
      : 'We will confirm your selected service’s availability and provide a quote by email.';
  };
  serviceType.addEventListener('change', updateEnquiryResponse);
  preferredDate.addEventListener('change', updateEnquiryResponse);
}

document.querySelectorAll('.site-form').forEach(form => {
  const messageField = form.querySelector('textarea[maxlength]');
  const messageCount = form.querySelector('#message-count');
  const status = form.querySelector('.form-status');
  const updateMessageCount = () => {
    if (messageField && messageCount) {
      messageCount.textContent = `${messageField.value.length} / ${messageField.maxLength} characters (minimum ${messageField.minLength})`;
    }
  };

  if (messageField) {
    messageField.addEventListener('input', updateMessageCount);
  }

  form.addEventListener('reset', () => {
    requestAnimationFrame(() => {
      updateMessageCount();
      if (status) {
        status.textContent = '';
      }
      if (form.classList.contains('enquiry-form')) {
        const response = form.querySelector('#enquiry-response');
        response.textContent = 'We will confirm your selected service’s availability and provide a quote by email.';
      }
    });
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) {
      return;
    }

    const formData = new FormData(form);
    const details = Array.from(formData.entries())
      .map(([label, value]) => `${label}: ${value}`)
      .join('\n');
    const isEnquiry = form.classList.contains('enquiry-form');
    const service = formData.get('Photography service');
    const subject = isEnquiry
      ? `Photography enquiry${service ? ` - ${service}` : ''}`
      : `Website message - ${formData.get('Message type')}`;
    const recipient = form.getAttribute('action');
    const mailto = `${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(details)}`;

    if (status) {
      status.textContent = 'Your email app should open with your details ready to send. Please review and send the email to complete your message.';
    }
    if (isEnquiry) {
      const response = form.querySelector('#enquiry-response');
      response.textContent = `Your ${service.toLowerCase()} enquiry for ${formData.get('Preferred shoot date')} in ${formData.get('Preferred location')} is ready. We will confirm availability and provide a quote after receiving your email.`;
    }
    window.location.href = mailto;
  });
});

const gallerySearch = document.getElementById('gallerySearch');
const gallerySort = document.getElementById('gallerySort');
const galleryResults = document.getElementById('galleryResults');
if (gallerySearch && gallerySort && galleryResults) {
  const categories = Array.from(document.querySelectorAll('.gallery-category'));
  const totalFigures = Array.from(document.querySelectorAll('.gallery-photos figure')).length;
  const originalFigures = new Map(
    categories.map(category => [category, Array.from(category.querySelectorAll('figure'))])
  );

  const updateGallery = () => {
    const query = gallerySearch.value.trim().toLocaleLowerCase();
    let visibleCount = 0;

    categories.forEach(category => {
      const heading = category.querySelector('h2').textContent.toLocaleLowerCase();
      const figures = originalFigures.get(category);
      const sortedFigures = gallerySort.value === 'az'
        ? [...figures].sort((first, second) =>
          first.querySelector('img').alt.localeCompare(second.querySelector('img').alt)
        )
        : figures;

      sortedFigures.forEach(figure => {
        const image = figure.querySelector('img');
        const caption = figure.querySelector('figcaption')?.textContent || '';
        const matches = !query || `${heading} ${image.alt} ${caption}`.toLocaleLowerCase().includes(query);
        figure.hidden = !matches;
        visibleCount += Number(matches);
        category.querySelector('.gallery-photos').append(figure);
      });

      category.hidden = !sortedFigures.some(figure => !figure.hidden);
    });

    galleryResults.textContent = visibleCount
      ? `Showing ${visibleCount} of ${totalFigures} portfolio images.`
      : 'No portfolio images match your search.';
  };

  gallerySearch.addEventListener('input', updateGallery);
  gallerySort.addEventListener('change', updateGallery);
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