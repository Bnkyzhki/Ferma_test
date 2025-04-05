export function createCategoryFilter(products) {
    const categories = [...new Set(products.map(product => product.category))];
    const categoryContainer = document.getElementById('categoryContainer');

    categories.forEach(category => {
        const label = document.createElement('label');
        label.textContent = category;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = category;
        checkbox.classList.add('category-checkbox');

        label.prepend(checkbox);
        categoryContainer.appendChild(label);
    });
}

export function filterProductsByCategories(products, selectedCategories) {
    if (selectedCategories.length === 0) {
        return products;
    }
    return products.filter(product => selectedCategories.includes(product.category));
}

