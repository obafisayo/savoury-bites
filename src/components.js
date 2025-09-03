// Function to initialize navbar functionality
function initNavbar() {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Check if elements exist before adding event listeners
  if (navToggle && navMenu) {
    // Toggle mobile menu
    navToggle.addEventListener("click", () => {
      console.log("navbar clicked");
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
      }
    });
  }

  // Close mobile menu when a link is clicked
  if (navLinks.length > 0) {
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navMenu && navToggle) {
          navMenu.classList.remove("active");
          navToggle.classList.remove("active");
        }
      });
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Handle window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && navMenu && navToggle) {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    }
  });
}

// Function to initialize footer functionality (if needed)
function initFooter() {
  // Add any footer-specific JavaScript here
  console.log("Footer initialized");
}

// Function to load HTML components
function loadComponent(elementId, filePath, callback) {
  fetch(filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById(elementId).innerHTML = data;
      
      // Execute callback after component is loaded
      if (callback && typeof callback === 'function') {
        // Small delay to ensure DOM is updated
        setTimeout(callback, 10);
      }
    })
    .catch(error => {
      console.error('Error loading component:', error);
    });
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Load navbar with initialization callback
  if (document.getElementById('navbar')) {
    loadComponent('navbar', 'components/navbar.html', initNavbar);
  }
  
  // Load footer with initialization callback
  if (document.getElementById('footer')) {
    loadComponent('footer', 'components/footer.html', initFooter);
  }
});