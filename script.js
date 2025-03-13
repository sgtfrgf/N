// Smooth scrolling for navigation links
// Enhanced smooth scrolling with progress indication
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      // Create progress indicator
      const progressIndicator = document.createElement('div');
      progressIndicator.classList.add('scroll-progress');
      document.body.appendChild(progressIndicator);
      
      // Calculate distance to scroll
      const startPosition = window.pageYOffset;
      const targetPosition = targetSection.getBoundingClientRect().top + startPosition - 70;
      const distance = targetPosition - startPosition;
      
      let startTime = null;
      const duration = 800; // ms
      
      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Update progress indicator
        progressIndicator.style.width = `${progress * 100}%`;
        
        const easeInOutQuad = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const newPosition = startPosition + distance * easeInOutQuad(progress);
        
        window.scrollTo(0, newPosition);
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        } else {
          // Remove progress indicator after completion
          setTimeout(() => {
            document.body.removeChild(progressIndicator);
          }, 300);
        }
      }
      
      requestAnimationFrame(animation);
    });
  });
  
  // Add animation to elements on scroll
  const animateOnScroll = (elements, animationClass) => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
  
    elements.forEach((element, index) => {
      // Add staggered delay based on index
      element.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(element);
    });
  };
  
  // Initialize animations on DOM load
  window.addEventListener('DOMContentLoaded', () => {
    // Achievement cards animation
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    animateOnScroll(achievementCards, 'animate-in');
    
    // Timeline items animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
      item.style.opacity = '0';
      if (index % 2 === 0) {
        item.style.transform = 'translateX(-30px)';
      } else {
        item.style.transform = 'translateX(30px)';
      }
      item.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    });
    animateOnScroll(timelineItems, 'animate-in');
    
    // Gallery items animation
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'scale(0.95)';
      item.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    });
    animateOnScroll(galleryItems, 'animate-in');
    
    // About section animation
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
      aboutContent.style.opacity = '0';
      aboutContent.style.transform = 'translateY(30px)';
      aboutContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      animateOnScroll([aboutContent], 'animate-in');
    }
    
    // Section headers animation
    const sectionHeaders = document.querySelectorAll('section h2');
    sectionHeaders.forEach(header => {
      header.style.opacity = '0';
      header.style.transform = 'translateY(20px)';
      header.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    animateOnScroll(sectionHeaders, 'animate-in');
    
    // Add active class to nav items on scroll
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');
    const navElement = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY + 200;
      
      // Add scrolled class to nav when scrolling
      if (window.scrollY > 50) {
        navElement.classList.add('scrolled');
      } else {
        navElement.classList.remove('scrolled');
      }
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          const correspondingLink = document.querySelector(`nav a[href="#${section.id}"]`);
          navLinks.forEach(link => link.classList.remove('active'));
          if (correspondingLink) correspondingLink.classList.add('active');
        }
      });
    });
  });
  
  // Add custom class for animated elements
  document.head.insertAdjacentHTML('beforeend', `
    <style>
      .animate-in {
        opacity: 1 !important;
        transform: translate(0) scale(1) !important;
      }
      nav a.active {
        color: #FF9933;
      }
      nav a.active:after {
        width: 100%;
      }
    </style>
  `);
  
  // Add current year to footer copyright
  document.addEventListener('DOMContentLoaded', function() {
    const footerYear = document.querySelector('footer p');
    const currentYear = new Date().getFullYear();
    footerYear.innerHTML = footerYear.innerHTML.replace('2023', currentYear);
    
    // Scroll to top functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
  
  // Add spotlight effect to about section
  const aboutContent = document.querySelector('.about-content');
  if (aboutContent) {
    aboutContent.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xPercent = Math.round((x / rect.width) * 100);
      const yPercent = Math.round((y / rect.height) * 100);
      
      this.style.setProperty('--xPos', `${xPercent}%`);
      this.style.setProperty('--yPos', `${yPercent}%`);
    });
    
    aboutContent.addEventListener('mouseleave', function() {
      this.style.setProperty('--xPos', '50%');
      this.style.setProperty('--yPos', '50%');
    });
  }
  
  // Add 3D tilt effect to achievement cards
  const cards = document.querySelectorAll('.achievement-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
  
  // Add parallax scrolling effect to sections
  function parallaxEffect() {
    const parallaxElements = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      
      parallaxElements.forEach(element => {
        const elementPosition = element.offsetTop;
        const elementHeight = element.offsetHeight;
        const viewportHeight = window.innerHeight;
        
        if (scrollY > elementPosition - viewportHeight && 
            scrollY < elementPosition + elementHeight) {
          
          const speed = element.dataset.speed || 0.1;
          const yPos = (scrollY - elementPosition) * speed;
          
          element.style.backgroundPositionY = `${yPos}px`;
        }
      });
    });
  }
  
  // Dynamic content loading with lazy loading
  function initLazyLoading() {
    // Create intersection observer for lazy loading
    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target;
          const dataUrl = section.dataset.contentUrl;
          
          if (dataUrl && !section.classList.contains('loaded')) {
            fetch(dataUrl)
              .then(response => response.text())
              .then(html => {
                const contentContainer = section.querySelector('.dynamic-content');
                if (contentContainer) {
                  contentContainer.innerHTML = html;
                  section.classList.add('loaded');
                  
                  // Reinitialize animations for dynamically loaded content
                  const newElements = contentContainer.querySelectorAll('.animate-on-load');
                  animateOnScroll(newElements, 'animate-in');
                }
              })
              .catch(error => console.error('Error loading content:', error));
          }
          
          observer.unobserve(section);
        }
      });
    }, { threshold: 0.2 });
    
    // Observe sections with dynamic content
    document.querySelectorAll('[data-content-url]').forEach(section => {
      lazyLoadObserver.observe(section);
    });
  }
  
  // Interactive timeline with event highlighting
  function enhanceTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        // Highlight the current item
        timelineItems.forEach(i => i.classList.remove('highlighted'));
        item.classList.add('highlighted');
        
        // Animate the timeline marker
        const marker = item.querySelector('::after');
        if (marker) {
          marker.style.transform = 'scale(1.5)';
          marker.style.boxShadow = '0 0 15px rgba(255, 153, 51, 0.8)';
        }
        
        // Add glow effect to the timeline line
        const timeline = document.querySelector('.timeline::after');
        if (timeline) {
          timeline.style.boxShadow = '0 0 20px rgba(255, 153, 51, 0.7)';
        }
      });
      
      item.addEventListener('mouseleave', () => {
        // Reset styles
        item.classList.remove('highlighted');
        
        const marker = item.querySelector('::after');
        if (marker) {
          marker.style.transform = 'scale(1)';
          marker.style.boxShadow = 'none';
        }
        
        const timeline = document.querySelector('.timeline::after');
        if (timeline) {
          timeline.style.boxShadow = '0 0 15px rgba(255, 153, 51, 0.4)';
        }
      });
    });
  }
  
  // Advanced text animation for headings
  function textAnimation() {
    const headings = document.querySelectorAll('h2, #hero h2');
    
    headings.forEach(heading => {
      const text = heading.textContent;
      heading.textContent = '';
      
      for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i] === ' ' ? ' ' : text[i];
        span.style.animationDelay = `${i * 0.05}s`;
        span.classList.add('char-animate');
        heading.appendChild(span);
      }
    });
  }
  
  // Initialize advanced features
  document.addEventListener('DOMContentLoaded', () => {
    parallaxEffect();
    initLazyLoading();
    enhanceTimeline();
    textAnimation();
    
    // Add theme switching capability
    const themeToggle = document.createElement('div');
    themeToggle.classList.add('theme-toggle');
    themeToggle.innerHTML = '<i class="fas fa-adjust"></i>';
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
    });
    
    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'light') {
      document.body.classList.add('light-theme');
    }
  });
  
  // Add performance monitoring
  const perfMonitor = {
    startTime: performance.now(),
    
    logTimeToFirstPaint: () => {
      window.addEventListener('load', () => {
        const paintTime = performance.now() - perfMonitor.startTime;
        console.log(`Time to first paint: ${Math.round(paintTime)}ms`);
      });
    },
    
    logPageInteractivity: () => {
      const firstInteraction = () => {
        const interactionTime = performance.now() - perfMonitor.startTime;
        console.log(`Time to first interaction: ${Math.round(interactionTime)}ms`);
        
        // Remove listeners after first interaction
        ['click', 'keydown', 'scroll'].forEach(event => {
          document.removeEventListener(event, firstInteraction);
        });
      };
      
      ['click', 'keydown', 'scroll'].forEach(event => {
        document.addEventListener(event, firstInteraction, { once: true });
      });
    }
  };
  
  perfMonitor.logTimeToFirstPaint();
  perfMonitor.logPageInteractivity();
  
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      this.style.transform = `translateY(-15px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
  
    
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollIndicator.classList.add('visible');
      } else {
        scrollIndicator.classList.remove('visible');
      }
    });
    
    scrollIndicator.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });
  
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the form data to a server
    // For now, we'll just show a success message
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    contactForm.reset();
  });
}

// Scroll to top button functionality
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollIndicator.style.display = 'block';
    } else {
      scrollIndicator.style.display = 'none';
    }
  });

  scrollIndicator.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Add animation to gallery items on scroll
const galleryItems = document.querySelectorAll('.gallery-item');
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

galleryItems.forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(20px)';
  item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(item);
});
  
// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navCenter = document.querySelector('.nav-center');
const navItems = document.querySelectorAll('.nav-item');

if (hamburger && navCenter) {
  // Toggle mobile menu
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.toggle('active');
    navCenter.classList.toggle('active');
  });

  // Handle nav item clicks on mobile
  navItems.forEach(item => {
    const megaMenu = item.querySelector('.mega-menu');
    if (megaMenu) {
      item.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) {
          e.preventDefault();
          const isActive = item.classList.contains('active');
          
          // Close other active items
          navItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('active');
            }
          });
          
          // Toggle current item
          item.classList.toggle('active');
        }
      });
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navCenter.contains(e.target)) {
      hamburger.classList.remove('active');
      navCenter.classList.remove('active');
      navItems.forEach(item => item.classList.remove('active'));
    }
  });

  // Handle touch events for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  navCenter.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  navCenter.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0 && navCenter.classList.contains('active')) {
        // Swipe right - close menu
        hamburger.classList.remove('active');
        navCenter.classList.remove('active');
        navItems.forEach(item => item.classList.remove('active'));
      }
    }
  }
}

// Notification and Profile Dropdowns for Mobile
const notificationBtn = document.querySelector('.notification-btn');
const notificationMenu = document.querySelector('.notification-menu');
const profileBtn = document.querySelector('.profile-btn');
const profileMenu = document.querySelector('.profile-menu');

if (notificationBtn && notificationMenu && profileBtn && profileMenu) {
  // Toggle notification menu
  notificationBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    notificationMenu.classList.toggle('active');
    profileMenu.classList.remove('active');
  });

  // Toggle profile menu
  profileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    profileMenu.classList.toggle('active');
    notificationMenu.classList.remove('active');
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!notificationBtn.contains(e.target) && !notificationMenu.contains(e.target) &&
        !profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
      notificationMenu.classList.remove('active');
      profileMenu.classList.remove('active');
    }
  });

  // Handle touch events for dropdowns
  let dropdownTouchStartY = 0;
  let dropdownTouchEndY = 0;

  [notificationMenu, profileMenu].forEach(menu => {
    menu.addEventListener('touchstart', (e) => {
      dropdownTouchStartY = e.changedTouches[0].screenY;
    });

    menu.addEventListener('touchend', (e) => {
      dropdownTouchEndY = e.changedTouches[0].screenY;
      handleDropdownSwipe(menu);
    });
  });

  function handleDropdownSwipe(menu) {
    const swipeThreshold = 50;
    const swipeDistance = dropdownTouchEndY - dropdownTouchStartY;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0 && menu.classList.contains('active')) {
        // Swipe down - close menu
        menu.classList.remove('active');
      }
    }
  }
}

// Optimize scroll performance on mobile
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (scrollTimeout) {
    window.cancelAnimationFrame(scrollTimeout);
  }
  
  scrollTimeout = window.requestAnimationFrame(() => {
    // Update active section
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        const correspondingLink = document.querySelector(`nav a[href="#${section.id}"]`);
        if (correspondingLink) {
          document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
          correspondingLink.classList.add('active');
        }
      }
    });
  });
});
  