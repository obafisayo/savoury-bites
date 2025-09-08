class MenuRenderer {
  constructor(menuData) {
    this.menuData = menuData;
    this.currentFilter = "Breakfast"; //default filter
    this.menuGrid = document.getElementById("menuGrid");

    this.init();
  }

  init() {
    this.renderMenuItems();
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
            <img src="${item.image}" alt="${item.name}" class="menu-item-image">
            <div class="menu-item-content">
              <h3 class="menu-item-title">${item.name}</h3>
              <p class="menu-item-description">${item.description}</p>
              <div class="menu-item-price">${item.price.toFixed(1)}$</div>
            </div>
          </div>
        `
      )
      .join("");
  }

  filterByCategory(category) {
    this.currentFilter = category;
    this.renderMenuItems();
  }
}

//make it available globally
window.MenuRenderer = MenuRenderer;
