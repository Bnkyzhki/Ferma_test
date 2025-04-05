import { fetchProducts } from "./fetch.js";
import { createCategoryFilter, filterProductsByCategories } from "./filters.js";
import { addToFavorites, isFavorite, removeFromFavorites } from "./favorites.js";

document.addEventListener("DOMContentLoaded", async () => {
    const productList = document.getElementById("product-list");
    const sortSelect = document.getElementById('sortPrice');
    const categoryContainer = document.getElementById('categoryContainer');
    const notification = document.getElementById('notification');

    function showNotification(message) {
        notification.textContent = message;
        notification.classList.add("show");
        setTimeout(() => {
            notification.classList.remove("show");
        }, 3000);
    }

    function renderProducts(products) {
        productList.innerHTML = "";

        products.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("card");
            const favoriteIcon = isFavorite(product) ? 'fa-solid fa-heart' : 'fa-regular fa-heart'; 
            card.innerHTML = `
                <div class="image-container">
                    <img src="src/image.png" alt="${product.title}">
                    <button class="favorite-btn"><i class="fa ${favoriteIcon}"></i></button>
                </div>
                <h3>${product.title}</h3>
                <p>Категория: ${product.category}</p>
                <p class="price">${product.price} ₽</p>
            `;
            const favoriteBtn = card.querySelector(".favorite-btn");
            favoriteBtn.addEventListener("click", () => {
                if (isFavorite(product)) {
                    removeFromFavorites(product);
                    favoriteBtn.innerHTML = '<i class="fa fa-regular fa-heart"></i>';
                    showNotification(`Товар "${product.title}" удален из избранного`);
                } else {
                    addToFavorites(product);
                    favoriteBtn.innerHTML = '<i class="fa fa-solid fa-heart"></i>';
                    showNotification(`Товар "${product.title}" добавлен в избранное`);
                }
            });

            productList.appendChild(card);
        });
    }

    function sortProducts(products, order) {
        return products.sort((a, b) => {
            if (order === 'asc') {
                return a.price - b.price;
            } else if (order === 'desc') {
                return b.price - a.price;
            } else {
                return 0;
            }
        });
    }

    sortSelect.addEventListener('change', async (event) => {
        const sortOrder = event.target.value;
        let products = await fetchProducts();
        products = sortProducts(products, sortOrder);
        products = filterProductsByCategories(products, getSelectedCategories());
        renderProducts(products);
    });

    categoryContainer.addEventListener('change', async () => {
        const selectedCategories = getSelectedCategories();
        let products = await fetchProducts();
        products = filterProductsByCategories(products, selectedCategories);
        products = sortProducts(products, sortSelect.value);
        renderProducts(products);
    });

    function getSelectedCategories() {
        const checkboxes = document.querySelectorAll('.category-checkbox:checked');
        const selectedCategories = [];
        checkboxes.forEach(checkbox => selectedCategories.push(checkbox.value));
        return selectedCategories;
    }

    const products = await fetchProducts();
    createCategoryFilter(products);
    renderProducts(products);
});







