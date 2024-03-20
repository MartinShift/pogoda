
export const getFavorites = () =>
{
    return JSON.parse(localStorage.getItem('favorites')) || [];
}