// Simple model for categories (no DB, just structure)
class Category {
  constructor(name) {
    this.id = Date.now();
    this.name = name;
  }
}

export default Category;
