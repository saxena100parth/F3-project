let url = `https://fakestoreapi.com/products`;
let data = [];
let mensItems = document.querySelector(".mens-item");
let womensItems = document.querySelector(".womens-item");
let Jewellery = document.querySelector(".jewellery-item");
let electronics = document.querySelector(".electronics-item");
let filterMan = document.querySelector(".filter-men");
let filterWomen = document.querySelector(".filter-women");
let filterJewelry = document.querySelector(".filter-jewelry");
let filterElect = document.querySelector(".filter-elect");
let allItem = document.querySelector(".all");
let myDiv = document.getElementById("allElemnt");

if (!sessionStorage.getItem("currentuser")) {
  window.location.href = "../login/index.html";
  alert("you need to signup or login first to access products");
}

let products = JSON.parse(localStorage.getItem("products")) || [];
let cartproducts = JSON.parse(localStorage.getItem("cartproducts")) || [];
let currentProd = [];

// let prodcont = document.querySelector(".product-container");
let filters = document.querySelectorAll(".filter");

let searchbar = document.querySelector("#search-bar");
console.log(filters);

// if(!localStorage.getItem("products")){
fetch(url)
  .then((res) => {
    return res.json();
  })
  .then((json) => {
    products = json;
    // products = modifyproducts(products);
    localStorage.setItem("products", JSON.stringify(products));
    console.log(products);
    //
    data = json;
    all();
    // console.log(data[0].price);

    allItem.addEventListener("click", () => {
      all();
    });

    filterMan.addEventListener("click", () => {
      filterItem();
      womensItems.parentElement.classList.add("abc");
      Jewellery.parentElement.classList.add("abc");
      electronics.parentElement.classList.add("abc");
      mensItems.parentElement.classList.remove("abc");
      filterMan.classList.add("active");
      filterWomen.classList.remove("active");
      filterJewelry.classList.remove("active");
      filterElect.classList.remove("active");
      allItem.classList.remove("active");
      menClothing();
    });

    filterWomen.addEventListener("click", () => {
      filterItem();
      let box = [mensItems, Jewellery, electronics];
      box.forEach((item) => {
        item.parentElement.classList.add("abc");
      });

      womensItems.parentElement.classList.remove("abc");
      filterWomen.classList.add("active");

      let filterArr = [filterMan, filterJewelry, filterElect, allItem];
      filterArr.forEach((item) => {
        item.classList.remove("active");
      });
      womenClothing();
    });

    filterJewelry.addEventListener("click", () => {
      filterItem();
      mensItems.parentElement.classList.add("abc");
      womensItems.parentElement.classList.add("abc");
      electronics.parentElement.classList.add("abc");
      Jewellery.parentElement.classList.remove("abc");
      filterMan.classList.remove("active");
      filterWomen.classList.remove("active");
      filterJewelry.classList.add("active");
      filterElect.classList.remove("active");
      allItem.classList.remove("active");
      showJewellery();
    });

    filterElect.addEventListener("click", () => {
      filterItem();
      mensItems.parentElement.classList.add("abc");
      womensItems.parentElement.classList.add("abc");
      Jewellery.parentElement.classList.add("abc");
      electronics.parentElement.classList.remove("abc");
      filterMan.classList.remove("active");
      filterWomen.classList.remove("active");
      filterJewelry.classList.remove("active");
      filterElect.classList.add("active");
      allItem.classList.remove("active");
      showElectronic();
    });
  }); //end of .then()
//}//end of if
//Men's Clothing
function menClothing() {
  data.filter((element) => {
    if (element.category === `men's clothing`) {
      product(element, mensItems);
    }
  });
}

//Women's Clothing:
function womenClothing() {
  data.filter((element) => {
    if (element.category === `women's clothing`) {
      product(element, womensItems);
    }
  });
}
//Jewellery
function showJewellery() {
  data.filter((element) => {
    if (element.category === `jewelery`) {
      product(element, Jewellery);
    }
  });
}
//Electronics
function showElectronic() {
  data.filter((element) => {
    if (element.category === `electronics`) {
      product(element, electronics);
    }
  });
}
//making dynamic product
function product(element, div) {
  const id = element.id;
  const title = element.title;
  const description = element.description;
  const category = element.category;
  const price = element.price;
  const image = element.image;
  const rate = element.rating.rate;

  let div2 = document.createElement("div");
  div2.className = "item";
  div2.innerHTML = `<div class="info">
          <img src=${image} class='my' alt="Item" /> 
          <div class="row title">Name: ${title}</div>
            <div class="row">
              <div class="price">Price: $${price}</div>
              <div class="sized">Size: S,M,L</div>
            </div>
            <div class="colors">
              Colors:
              <div class="row">
                <div class="circle" style="background-color: #000"></div>
                <div class="circle" style="background-color: #4938af"></div>
                <div class="circle" style="background-color: #203d3e"></div>
              </div>
            </div>
            <div class="row">Rating:${ratingstars(rate)}</div>
            </div>
            <button id="addBtn-${id}" onclick="addtocartfunc(event)">Add to Cart</button>`;
  div.appendChild(div2);
}

function filterItem() {
  myDiv.innerHTML = "";
  mensItems.innerHTML = "";
  womensItems.innerHTML = "";
  Jewellery.innerHTML = "";
  electronics.innerHTML = "";
}

document.getElementById("filter-item").addEventListener("click", () => {
  filterItem();
  priceFilter();
});
function priceFilter() {
  let priceArr = [];
  let checkboxes = document
    .getElementById("priceRange")
    .querySelectorAll('input[type="checkbox"]:checked');
  // console.log(checkboxes[0].value);
  if (checkboxes.length !== 0) {
    checkboxes.forEach((item) => {
      priceArr.push(parseInt(item.value));
    });
  }
  // filterItem();
  for (let i = 0; i < priceArr.length; i++) {
    getPriceRange(priceArr[i]);
  }
}
function getPriceRange(price) {
  if (price <= 25 && price > 0) {
    data.filter((element) => {
      if (element.price <= 25 && element.price > 0) {
        product(element, myDiv);
      }
    });
  } else if (price > 25 && price <= 50) {
    data.filter((element) => {
      if (element.price > 25 && element.price <= 50) {
        product(element, myDiv);
      }
    });
  } else if (price > 50 && price <= 100) {
    data.filter((element) => {
      if (element.price > 50 && element.price <= 100) {
        product(element, myDiv);
      }
    });
  } else if (price > 100) {
    data.filter((element) => {
      if (element.price > 100) {
        product(element, myDiv);
      }
    });
  }
}

//Rating stars
function ratingstars(rating) {
  rating = Math.round(rating);
  let str = "";
  for (let i = 0; i < rating; i++) {
    str += "⭐";
  }
  return str;
}

//ADD to Cart
function addtocartfunc(event) {
  let str = event.target.innerText;
  let id = Number(event.target.getAttribute("id").split("-")[1]);
  // console.log(id);

  if (str == "Add to Cart") {
    event.target.innerText = "Added";

    for (let product of products) {
      if (product.id == id) {
        cartproducts.push(product);
        // console.log(cartproducts);
        break;
      }
    }
  } else {
    event.target.innerText = "Add to Cart";

    for (let i = 0; i < cartproducts.length; i++) {
      if (cartproducts[i].id == id) {
        cartproducts.splice(i, 1);
      }
    }
  }
  localStorage.setItem("cartproducts", JSON.stringify(cartproducts));
  // console.log(cartproducts);
}

function all() {
  let classArr = document.querySelectorAll(".abc");
  classArr.forEach((item) => {
    item.classList.remove("abc");
  });

  let classArr2 = document.querySelectorAll(".active");
  classArr2.forEach((item) => {
    item.classList.remove("active");
  });
  allItem.classList.add("active");
  filterItem();
  menClothing();
  womenClothing();
  showJewellery();
  showElectronic();
}
