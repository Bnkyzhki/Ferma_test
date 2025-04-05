export function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}

export function addToFavorites(product) {
    const favorites = getFavorites();
    const isAlreadyFavorite = favorites.some(fav => fav.id === product.id);

    if (!isAlreadyFavorite) {
        favorites.push(product);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
}

export function removeFromFavorites(product) {
    let favorites = getFavorites();
    favorites = favorites.filter(fav => fav.id !== product.id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

export function isFavorite(product) {
    const favorites = getFavorites();
    return favorites.some(fav => fav.id === product.id);
}
