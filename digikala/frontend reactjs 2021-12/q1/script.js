// Elements
const nextBtn = document.querySelector(".js-next-btn");
const productCard = document.querySelector(".js-product-card");
const previousBtn = document.querySelector(".js-previous-btn");
const productCardLink = document.querySelector(".js-product-link");
const productCardImage = document.querySelector(".js-product-card-image");
const productCardTitle = document.querySelector(".js-product-card-title");
const productCardPrice = document.querySelector(".js-product-card-price");
const productCardDiscountOldPrice = document.querySelector(
  ".js-product-card-discount-old-price"
);
const productCardDiscountContainer = document.querySelector(
  ".js-product-card-discount-container"
);
const productCardDiscountPercentage = document.querySelector(
  ".js-product-card-discount-percentage"
);

const PRODUCTS = window.productsListData || [];

function showProduct(product) {
  if (!product) return;
  console.log(product.id);
  productCardTitle.innerHTML = product.title;
  productCardLink.setAttribute("href", product.url);
  productCardImage.setAttribute("src", product.image);
  productCard.setAttribute("data-product-id", product.id);
  productCardPrice.innerHTML = window.formatPrice(product.price.selling_price);
  if (product.price.discount_percent > 0) {
    productCardDiscountContainer.classList.remove("hidden");
    productCardDiscountOldPrice.innerHTML = window.formatPrice(
      product.price.main_price
    );
    productCardDiscountPercentage.innerHTML = `${window.formatPrice(
      product.price.discount_percent
    )}٪`;
  } else {
    productCardDiscountContainer.classList.add("hidden");
  }
  init();
}

let timeoutId;

let productsIndexes = Array(PRODUCTS.length)
  .fill(0)
  .map((_, i) => i);

function moveToEnd(index, array) {
  let indexVal;
  for (let i = 0; i < array.length; i++) {
    if (i < index) continue;
    if (i == index) {
      indexVal = array[i];
      array[i] = array[i + 1];
      continue;
    }
    if (i > index && i < array.length - 1) {
      array[i] = array[i + 1];
      continue;
    }
    if (i === array.length - 1) array[i] = indexVal;
  }
}

function generateRandomNum() {
  return Math.floor(Math.random() * (PRODUCTS.length - 2));
}

function timeoutHandler() {
  const randomIndex = generateRandomNum();
  showProduct(PRODUCTS[productsIndexes[randomIndex]]);
  moveToEnd(randomIndex, productsIndexes);
}

function init() {
  // TODO: Complete this function
  timeoutId = setTimeout(timeoutHandler, 4000);
}

function nextProduct() {
  clearTimeout(timeoutId);
  timeoutHandler();
}

function previousProduct() {
  clearTimeout(timeoutId);
  showProduct(PRODUCTS[productsIndexes[productsIndexes.length - 2]]);
}

// Start
showProduct(PRODUCTS[PRODUCTS.length - 1]);
// Navigation
nextBtn.addEventListener("click", () => nextProduct());
previousBtn.addEventListener("click", () => previousProduct());
