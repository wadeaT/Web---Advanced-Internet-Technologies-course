// api.js
export async function fetchTokens() {
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum,tether,usd-coin&order=market_cap_desc&per_page=10&page=1&sparkline=false';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading tokens:', error);
        return null;
    }
}
