// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  
  question.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    
    // Close all FAQ items
    faqItems.forEach(faqItem => {
      faqItem.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// Smooth Scrolling for Navigation Links
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });
});

// Header Background on Scroll
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.style.background = 'rgba(255, 255, 255, 0.98)';
    header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.background = 'rgba(255, 255, 255, 0.95)';
    header.style.boxShadow = 'none';
  }
});

// Button Click Handlers
const ctaButtons = document.querySelectorAll('.cta-button, .cta-btn, .register-btn, .pricing-btn');

ctaButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Add registration logic here
    alert('Registration functionality would be implemented here!');
  });
});

const downloadBtn = document.querySelector('.download-btn');
if (downloadBtn) {
  downloadBtn.addEventListener('click', () => {
    // Add download logic here
    alert('Schedule download would be implemented here!');
  });
}

const viewAllBtn = document.querySelector('.view-all-btn');
if (viewAllBtn) {
  viewAllBtn.addEventListener('click', () => {
    // Add view all speakers logic here
    alert('View all speakers functionality would be implemented here!');
  });
}

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.stat-item, .speaker-card, .pricing-card, .timeline-item');

animateElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Counter Animation for Stats
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element, target) => {
  let current = 0;
  const increment = target / 100;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    
    if (target.toString().includes('k')) {
      element.textContent = Math.floor(current) + 'k+';
    } else if (target.toString().includes('X')) {
      element.textContent = Math.floor(current) + 'X';
    } else {
      element.textContent = Math.floor(current);
    }
  }, 20);
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target.textContent;
      let numericTarget;
      
      if (target.includes('100k+')) {
        numericTarget = 100;
        entry.target.textContent = '0k+';
      } else if (target.includes('2X')) {
        numericTarget = 2;
        entry.target.textContent = '0X';
      } else {
        numericTarget = parseInt(target);
        entry.target.textContent = '0';
      }
      
      animateCounter(entry.target, numericTarget);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
  statsObserver.observe(stat);
});
