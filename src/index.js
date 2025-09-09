import menuItems from "./menuItems.js";

class MenuRenderer {
  constructor(menuData) {
    this.menuData = menuData;
    this.currentFilter = "Breakfast";
    this.menuNav = document.getElementById("menuNav");
    this.menuGrid = document.getElementById("menuGrid");

    this.init();
  }

  init() {
    this.renderNavigation();
    this.renderMenuItems();
    this.attachEventListeners();
  }

  getCategories() {
    return [...new Set(this.menuData.map((item) => item.category))];
  }

  renderNavigation() {
    const categories = this.getCategories();
    this.menuNav.innerHTML = categories
      .map(
        (category) => `
                    <button class="nav-item ${
                      category === this.currentFilter ? "active" : ""
                    }" 
                            data-category="${category}">
                        ${category}
                    </button>
                `
      )
      .join("");
  }

  renderMenuItems() {
    const filteredItems = this.menuData.filter(
      (item) => item.category === this.currentFilter
    );

    if (filteredItems.length === 0) {
      this.menuGrid.innerHTML =
        '<div class="no-items">No items found in this category</div>';
      return;
    }

    this.menuGrid.innerHTML = filteredItems
      .map(
        (item) => `
                    <div class="menu-item">
                        <img src="${item.image}" alt="${
          item.name
        }" class="menu-item-image">
                        <div class="menu-item-content">
                            <h3 class="menu-item-title">${item.name}</h3>
                            <p class="menu-item-description">${
                              item.description
                            }</p>
                            <div class="menu-item-price">${item.price.toFixed(
                              1
                            )}$</div>
                        </div>
                    </div>
                `
      )
      .join("");
  }

  attachEventListeners() {
    this.menuNav.addEventListener("click", (e) => {
      if (e.target.classList.contains("nav-item")) {
        this.currentFilter = e.target.dataset.category;
        this.updateActiveNavItem(e.target);
        this.renderMenuItems();
      }
    });
  }

  updateActiveNavItem(activeItem) {
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.remove("active");
    });
    activeItem.classList.add("active");
  }

  filterByCategory(category) {
    this.currentFilter = category;
    this.renderNavigation();
    this.renderMenuItems();
  }
}

// Initialize the menu
const menuRenderer = new MenuRenderer(menuItems);
