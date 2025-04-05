const apiUrl = "https://products-qn4pgbgk1-orlovwebdevgmailcoms-projects.vercel.app/products.json";

async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Ошибка загрузки данных");
        }
        return await response.json();
    } catch (error) {
        console.error("Ошибка при получении данных:", error);
        return [];
    }
}

export { fetchProducts };