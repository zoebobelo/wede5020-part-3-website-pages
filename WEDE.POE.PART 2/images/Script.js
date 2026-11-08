const menuBtn = document.getElementById('menuBtn');
const mainNav = document.getElementById('mainNav');

if (menuBtn && mainNav) {
  const closeMenu = () => {
    mainNav.classList.remove('show');
    menuBtn.setAttribute('aria-expanded', 'false');
  };

  menuBtn.addEventListener('click', () => {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!isExpanded));
    mainNav.classList.toggle('show', !isExpanded);
  });

  mainNav.addEventListener('click', event => {
    if (event.target instanceof Element && event.target.closest('a')) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuBtn.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 769px)').matches) {
      closeMenu();
    }
  });
}

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

  fadeElements.forEach(element => observer.observe(element));
} else {
  fadeElements.forEach(element => element.classList.add('visible'));
}

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