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

document.documentElement.classList.add('js');