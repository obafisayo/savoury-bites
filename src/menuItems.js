const menuItems = [
  // Breakfast
  {
    id: 1,
    name: "Fresh Breakfast",
    description: "Lacus nisl, et ac dapibus sit eu velit in consequat.",
    price: 14.5,
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=200&h=200&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Mild Butter",
    description: "Lacus nisl, et ac dapibus sit eu velit in consequat.",
    price: 12.5,
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=200&h=200&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Fresh Bread",
    description: "Lacus nisl, et ac dapibus sit eu velit in consequat.",
    price: 12.5,
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=200&h=200&fit=crop&q=80",
  },

  // Lunch
  {
    id: 4,
    name: "Lettuce Leaf",
    description: "Lacus nisl, et ac dapibus sit eu velit in consequat.",
    price: 12.5,
    category: "Lunch",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop&q=80",
  },
  {
    id: 5,
    name: "Glow Cheese",
    description: "Lacus nisl, et ac dapibus sit eu velit in consequat.",
    price: 12.5,
    category: "Lunch",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=200&h=200&fit=crop&q=80",
  },
  {
    id: 6,
    name: "Italian Pizza",
    description: "Lacus nisl, et ac dapibus sit eu velit in consequat.",
    price: 14.5,
    category: "Lunch",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=200&fit=crop&q=80",
  },
  {
    id: 7,
    name: "Slice Beef",
    description: "Lacus nisl, et ac dapibus sit eu velit in consequat.",
    price: 12.5,
    category: "Lunch",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200&h=200&fit=crop&q=80",
  },
  // {
  //   id: 8,
  //   name: "Mushaom Pizza",
  //   description: "Lacus nisl, et ac dapibus sit eu velit in consequat.",
  //   price: 12.5,
  //   category: "Lunch",
  //   image:
  //     "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=200&fit=crop&q=80",
  // },
  // Dinner
  {
    id: 9,
    name: "Grilled Salmon",
    description: "Lacus nisl, et ac dapibus sit eu velit in consequat.",
    price: 18.5,
    category: "Dinner",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&h=200&fit=crop&q=80",
  },
  {
    id: 10,
    name: "Steak Dinner",
    description: "Lacus nisl, et ac dapibus sit eu velit in consequat.",
    price: 22.5,
    category: "Dinner",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200&h=200&fit=crop&q=80",
  },

  // Dessert
  {
    id: 11,
    name: "Chocolate Cake",
    description: "Lacus nisl, et ac dapibus sit eu velit in consequat.",
    price: 8.5,
    category: "Dessert",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&h=200&fit=crop&q=80",
  },
  {
    id: 12,
    name: "Ice Cream",
    description: "Lacus nisl, et ac dapibus sit eu velit in consequat.",
    price: 6.5,
    category: "Dessert",
    image: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=200&h=200&fit=crop&q=80",
  },

  // Drink
  {
    id: 13,
    name: "Fresh Juice",
    description: "Lacus nisl, et ac dapibus sit eu velit in consequat.",
    price: 4.5,
    category: "Drink",
    image: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=200&h=200&fit=crop&q=80",
  },
  {
    id: 14,
    name: "Coffee",
    description: "Lacus nisl, et ac dapibus sit eu velit in consequat.",
    price: 3.5,
    category: "Drink",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop&q=80",
  },

  // Snack
  {
    id: 15,
    name: "French Fries",
    description: "Lacus nisl, et ac dapibus sit eu velit in consequat.",
    price: 5.5,
    category: "Snack",
    image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=200&h=200&fit=crop&q=80",
  },
  {
    id: 16,
    name: "Onion Rings",
    description: "Lacus nisl, et ac dapibus sit eu velit in consequat.",
    price: 6.5,
    category: "Snack",
    image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=200&h=200&fit=crop&q=80",
  },

  // Soups
  {
    id: 17,
    name: "Tomato Soup",
    description: "Lacus nisl, et ac dapibus sit eu velit in consequat.",
    price: 7.5,
    category: "Soups",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=200&h=200&fit=crop&q=80",
  },
  {
    id: 18,
    name: "Chicken Soup",
    description: "Lacus nisl, et ac dapibus sit eu velit in consequat.",
    price: 9.5,
    category: "Soups",
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=200&h=200&fit=crop&q=80",
  },
];

export default menuItems;
