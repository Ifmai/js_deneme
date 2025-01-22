async function fetchProducts() {
  const url =
    "https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
}

const getProductPhotos = () => [
  {
    image:
      "https://img-lcwaikiki.mncdn.com/mnpadding/1200/1600/ffffff/pim/productimages/20221/5593210/v1/l_20221-s26331z8-cvl_a1.jpg",
  },
  {
    image:
      "https://img-lcwaikiki.mncdn.com/mnpadding/1200/1600/ffffff/pim/productimages/20221/5732790/l_20221-s2ee14z8-311_a2.jpg",
  },
  {
    image:
      "https://img-lcwaikiki.mncdn.com/mnpadding/1200/1600/ffffff/pim/productimages/20211/4919203/l_20211-s1ca24z8-lrk_a2.jpg",
  },
  {
    image:
      "https://img-lcwaikiki.mncdn.com/mnpadding/1200/1600/ffffff/pim/productimages/20212/5622474/l_20212-w1kd76z8-ffb_a3.jpg",
  },
  {
    image:
      "https://img-lcwaikiki.mncdn.com/mnpadding/1200/1600/ffffff/pim/productimages/20211/5353958/v1/l_20211-s1lc50z8-cvl_a1.jpg",
  },
  {
    image:
      "https://img-lcwaikiki.mncdn.com/mnpadding/1200/1600/ffffff/pim/productimages/20221/5771510/l_20221-s2fs71z8-cvl_a.jpg",
  },
  {
    image:
      "https://img-lcwaikiki.mncdn.com/mnpadding/1200/1600/ffffff/pim/productimages/20221/5593222/l_20221-s26332z8-lgs_a2.jpg",
  },
  {
    image:
      "https://img-lcwaikiki.mncdn.com/mnpadding/1200/1600/ffffff/pim/productimages/20211/5377552/v3/l_20211-s1lk77z8-ufs_a1.jpg",
  },
  {
    image:
      "https://img-lcwaikiki.mncdn.com/mnpadding/1200/1600/ffffff/pim/productimages/20221/5697917/l_20221-s2ci85z8-h9g_a1.jpg",
  },
  {
    image:
      "https://img-lcwaikiki.mncdn.com/mnpadding/1200/1600/ffffff/pim/productimages/20211/5088825/l_20211-s1h145z8-hkd_a.jpg",
  },
];

(() => {
  const init = async () => {
    buildHTML();
    buildCSS();
    await buildProduct();
    addScrollListeners();
  };

  const addScrollListeners = () => {
    const leftButton = document.querySelector(".scroll-left");
    const rightButton = document.querySelector(".scroll-right");

    let currentPage = 0;
    const totalProducts = document.querySelectorAll(".product-detail").length;
    const productsPerPage = 3;
    const maxPages = Math.ceil(totalProducts / productsPerPage) - 1;

    const updateVisibility = () => {
      const products = document.querySelectorAll(".product-detail");
      products.forEach((product, index) => {
        const isVisible = Math.floor(index / productsPerPage) === currentPage;
        product.style.display = isVisible ? "flex" : "none";
      });

      leftButton.style.display = currentPage > 0 ? "flex" : "none";
      rightButton.style.display = currentPage < maxPages ? "flex" : "none";
    };

    rightButton.addEventListener("click", () => {
      if (currentPage < maxPages) {
        currentPage++;
        updateVisibility();
      }
    });

    leftButton.addEventListener("click", () => {
      if (currentPage > 0) {
        currentPage--;
        updateVisibility();
      }
    });

    updateVisibility();
  };

  const buildProduct = async () => {
    const productList = await fetchProducts();
    const productPhoto = getProductPhotos();
    const container = document.querySelector(".products-container");
    let content = "";
    let favoriteProducts =
      JSON.parse(localStorage.getItem("favoriteProducts")) || [];

    for (let i = 0; i < productList.length; i++) {
      content += `
        <div class="product-detail">
          <div class="product-image-container">
            <img
              src="${productPhoto[i]["image"]}"
              alt="Ürün ${productList[i]["id"]}"
              class="product-image"
            />
            <button class="favorite-button" data-product-id="${productList[i]["id"]}" data-product-name="${productList[i]["name"]}">♥</button>
          </div>
          <div class="product-info">
            <h3 class="product-title">${productList[i]["name"]}</h3>
            <p class="product-price">${productList[i]["price"]} TRY</p>
            <a class="product-link" href="${productList[i]["url"]}">Ürün Detay</a>
          </div>
        </div>
      `;
    }

    container.innerHTML = content;

    const favoriteButtons = document.querySelectorAll(".favorite-button");
    favoriteButtons.forEach((button) => {
      const productId = button.dataset.productId.trim();
      if (favoriteProducts.some((product) => product.id === productId)) {
        button.classList.add("active");
      }
      button.addEventListener("click", function () {
        this.classList.toggle("active");
        if (this.classList.contains("active")) {
          const product = { id: productId };
          favoriteProducts.push(product);
        } else {
          favoriteProducts = favoriteProducts.filter(
            (item) => item.id !== productId
          );
        }
        localStorage.setItem(
          "favoriteProducts",
          JSON.stringify(favoriteProducts)
        );
      });
    });
  };

  const buildHTML = () => {
    const html = `
      <div class="products-section">
        <h2 class="section-title">Benzer Ürünler</h2>
        <div class="products-container">
        </div>
        <button class="scroll-button scroll-left">‹</button>
        <button class="scroll-button scroll-right">›</button>
      </div>
    `;

    $("body").append(html);
  };

  const buildCSS = () => {
    const css = `
      .products-section {
        max-width: 1200px;
        margin: 20px auto;
        position: relative;
        background: #fff;
        padding: 20px;
      }

      .section-title {
        font-size: 20px;
        margin-bottom: 20px;
        color: #333;
        font-weight: normal;
      }

      .products-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        margin: 0 40px;
      }

      .product-detail {
        display: flex;
        flex-direction: column;
        position: relative;
        background: #fff;
      }
      
      .product-link {
        color: inherit;
        text-decoration: none;
      }

      .product-link:hover {
        color: red;
        text-decoration: underline;
      }
    

      .product-image-container {
        position: relative;
        width: 100%;
        padding-bottom: 133.33%; /* 4:3 aspect ratio */
        overflow: hidden;
      }

      .product-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .product-info {
        padding: 10px 0;
      }

      .product-title {
        font-size: 14px;
        color: #333;
        margin: 0 0 8px 0;
        text-align: left;
        font-weight: normal;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .product-price {
        font-size: 16px;
        color: #333;
        margin: 0;
        text-align: left;
        font-weight: bold;
      }

      .favorite-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        cursor: pointer;
        font-size: 24px;
        color: #ccc;
        z-index: 2;
        padding: 0;
      }

      .favorite-button.active {
        color: blue;
      }

      .scroll-button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 40px;
        height: 40px;
        background: #fff;
        border: 1px solid #e5e5e5;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        color: #666;
        z-index: 1;
      }

      .scroll-left {
        left: 0;
      }

      .scroll-right {
        right: 0;
      }

      .scroll-button:hover {
        background: #f5f5f5;
      }

      @media (max-width: 768px) {
        .products-container {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 480px) {
        .products-container {
          grid-template-columns: 1fr;
        }
      }
    `;

    $("<style>").addClass("carousel-style").html(css).appendTo("head");
  };

  init();
})();
