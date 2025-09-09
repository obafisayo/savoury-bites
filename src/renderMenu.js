import menuItems from "./menuItems.js";

console.log(menuItems);

class MenuRenderer {
  constructor(menuData) {
    this.menuData = menuData;
    this.currentFilters = {
      categories: [],
      search: "",
      minPrice: null,
      maxPrice: null,
    };

    this.categoryFilters = document.getElementById("categoryFilters");
    this.menuGrid = document.getElementById("menuGrid");
    this.searchInput = document.getElementById("searchInput");
    this.minPriceInput = document.getElementById("minPrice");
    this.maxPriceInput = document.getElementById("maxPrice");
    this.clearFiltersBtn = document.getElementById("clearFilters");
    this.resultsCount = document.getElementById("resultsCount");
    this.activeFilters = document.getElementById("activeFilters");

    this.init();
  }

  init() {
    this.renderCategoryFilters();
    this.renderMenuItems();
    this.attachEventListeners();
  }

  getCategories() {
    return [...new Set(this.menuData.map(item => item.category))];
  }

  renderCategoryFilters() {
    const categories = this.getCategories();
    this.categoryFilters.innerHTML = categories
      .map(
        category =>
          `<button class="category-btn" data-category="${category}">${category}</button>`
      )
      .join("");
  }

  renderMenuItems() {
    const filteredItems = this.getFilteredItems();

    this.updateResultsInfo(filteredItems.length);
    this.updateActiveFilters();

    if (!filteredItems.length) {
      this.menuGrid.innerHTML =
        '<div class="no-items">No items match your current filters</div>';
      return;
    }

    this.menuGrid.innerHTML = filteredItems
      .map(
        item => `
        <div class="menu-item">
          <img src="${item.image}" alt="${item.name}" class="menu-item-image">
          <div class="menu-item-content">
            <h3 class="menu-item-title">${item.name}</h3>
            <p class="menu-item-description">${item.description}</p>
            <div class="menu-item-footer">
              <div class="menu-item-price">$${item.price.toFixed(2)}</div>
              <div class="menu-item-category">${item.category}</div>
            </div>
          </div>
        </div>
      `
      )
      .join("");
  }

  getFilteredItems() {
    return this.menuData.filter(item => {
      // Category filter
      if (
        this.currentFilters.categories.length &&
        !this.currentFilters.categories.includes(item.category)
      ) {
        return false;
      }

      // Search filter
      if (
        this.currentFilters.search &&
        !item.name.toLowerCase().includes(this.currentFilters.search.toLowerCase())
      ) {
        return false;
      }

      // Price filter
      if (
        (this.currentFilters.minPrice !== null && item.price < this.currentFilters.minPrice) ||
        (this.currentFilters.maxPrice !== null && item.price > this.currentFilters.maxPrice)
      ) {
        return false;
      }

      return true;
    });
  }

  updateResultsInfo(count) {
    this.resultsCount.textContent = `${count} item${count !== 1 ? "s" : ""} found`;
  }

  updateActiveFilters() {
    const filters = [];

    // Category filters
    this.currentFilters.categories.forEach(category => {
      filters.push(
        `<span class="filter-tag">${category} <span class="remove" onclick="menuRenderer.removeFilter('category', '${category}')"></span></span>`
      );
    });

    // Search filter
    if (this.currentFilters.search) {
      filters.push(
        `<span class="filter-tag">Search: "${this.currentFilters.search}" <span class="remove" onclick="menuRenderer.removeFilter('search')"></span></span>`
      );
    }

    // Price filter
    if (this.currentFilters.minPrice !== null || this.currentFilters.maxPrice !== null) {
      const priceText = `${
        this.currentFilters.minPrice !== null ? "$" + this.currentFilters.minPrice : ""
      }${
        this.currentFilters.minPrice !== null && this.currentFilters.maxPrice !== null ? " - " : ""
      }${
        this.currentFilters.maxPrice !== null ? "$" + this.currentFilters.maxPrice : ""
      }`;

      filters.push(
        `<span class="filter-tag">Price: ${priceText} <span class="remove" onclick="menuRenderer.removeFilter('price')"></span></span>`
      );
    }

    this.activeFilters.innerHTML = filters.join("");
  }

  removeFilter(type, value = null) {
    if (type === "category") {
      this.currentFilters.categories = this.currentFilters.categories.filter(cat => cat !== value);
      this.updateCategoryButtons();
    } else if (type === "search") {
      this.currentFilters.search = "";
      this.searchInput.value = "";
    } else if (type === "price") {
      this.currentFilters.minPrice = null;
      this.currentFilters.maxPrice = null;
      this.minPriceInput.value = "";
      this.maxPriceInput.value = "";
    }

    this.renderMenuItems();
  }

  updateCategoryButtons() {
    document.querySelectorAll(".category-btn").forEach(btn => {
      btn.classList.toggle(
        "active",
        this.currentFilters.categories.includes(btn.dataset.category)
      );
    });
  }

  attachEventListeners() {
    // Category buttons
    this.categoryFilters.addEventListener("click", e => {
      if (!e.target.classList.contains("category-btn")) return;

      const category = e.target.dataset.category;

      if (this.currentFilters.categories.includes(category)) {
        this.currentFilters.categories = this.currentFilters.categories.filter(cat => cat !== category);
      } else {
        this.currentFilters.categories.push(category);
      }

      this.updateCategoryButtons();
      this.renderMenuItems();
    });

    // Search input
    this.searchInput.addEventListener("input", e => {
      this.currentFilters.search = e.target.value.trim();
      this.renderMenuItems();
    });

    // Price inputs
    this.minPriceInput.addEventListener("input", e => {
      this.currentFilters.minPrice = e.target.value ? parseFloat(e.target.value) : null;
      this.renderMenuItems();
    });

    this.maxPriceInput.addEventListener("input", e => {
      this.currentFilters.maxPrice = e.target.value ? parseFloat(e.target.value) : null;
      this.renderMenuItems();
    });

    // Clear filters
    this.clearFiltersBtn.addEventListener("click", () => {
      this.currentFilters = { categories: [], search: "", minPrice: null, maxPrice: null };
      this.searchInput.value = "";
      this.minPriceInput.value = "";
      this.maxPriceInput.value = "";
      this.updateCategoryButtons();
      this.renderMenuItems();
    });
  }
}

// Initialize the menu
const menuRenderer = new MenuRenderer(menuItems);

