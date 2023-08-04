// Get reference to the main content section where products will be rendered
const menContent = document.getElementById("mens-clothing");
const womenContent = document.getElementById("women-clothing");

// Fetch products from the API
const fetchProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// Render products
const renderProducts = (products) => {
  menContent.innerHTML = ""; // Clear existing content
  // womenContent.innerHTML = "";
  products.forEach((product) => {
    // Create a product card
    const productCard = document.createElement("div");
    productCard.classList.add("item");
    productCard.innerHTML = `



      <img src="${product.image}" alt="${product.title}" />
      <div class="info">
        <div class="row">
          <div class="price">$${product.price}</div>
          <div class="sized">${product.category}</div>
        </div>
        <div class="colors">
          Colors:
          <div class="row">
            <div class="circle" style="background-color: #000"></div>
            <div class="circle" style="background-color: #4938af"></div>
            <div class="circle" style="background-color: #203d3e"></div>
          </div>
        </div>
        <div class="row">Rating: ${product.rating.rate}</div>
      </div>
      <button class="addBtn">Add to Cart</button>
    `;

    // Add the product card to the main content section
    // menContent.appendChild(productCard);
    product.category == "men's clothing"
      ? menContent.appendChild(productCard)
      : womenContent.appendChild(productCard);
  });
};

// Load and render products when the page is ready
document.addEventListener("DOMContentLoaded", async () => {
  const products = await fetchProducts();
  renderProducts(products);
});
