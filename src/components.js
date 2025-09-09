// Function to set active navigation link based on current page
function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    link.classList.toggle(
      "active",
      href === currentPage ||
        (currentPage === "" && href === "index.html") ||
        currentPage === "index.html"
    );
  });
}

// Function to initialize navbar functionality
function initNavbar() {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Highlight active page
  setActiveNavLink();

  if (navToggle && navMenu) {
    // Toggle mobile menu
    navToggle.addEventListener("click", () => {
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
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu && navToggle) {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
      }
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Reset nav state on window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && navMenu && navToggle) {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    }
  });
}

// Function to initialize footer functionality
function initFooter() {
  const newsletterForm = document.querySelector(".newsletter-form");
  const newsletterInput = document.querySelector(".newsletter-input");

  if (newsletterForm && newsletterInput) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = newsletterInput.value.trim();
      if (email) {
        alert("Thank you for subscribing!");
        newsletterInput.value = "";
      }
    });
  }

  console.log("Footer initialized");
}

// Function to load HTML components
function loadComponent(elementId, filePath, callback) {
  fetch(filePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
      const element = document.getElementById(elementId);
      if (element) {
        element.innerHTML = data;
        if (typeof callback === "function") {
          setTimeout(callback, 10); // allow DOM update
        }
      }
    })
    .catch((error) => {
      console.error(`Error loading component (${filePath}):`, error);
    });
}

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  // Load navbar
  if (document.getElementById("navbar")) {
    loadComponent("navbar", "components/navbar.html", initNavbar);
  } else {
    initNavbar(); // fallback if navbar already exists
  }

  // Load footer
  if (document.getElementById("footer")) {
    loadComponent("footer", "components/footer.html", initFooter);
  }

  // Initialize feather icons
  setTimeout(() => {
    if (typeof feather !== "undefined") {
      feather.replace();
    }
  }, 100);
});
