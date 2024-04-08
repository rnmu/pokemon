import axios from 'axios';

const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
let cachedData: any = null;

export const fetchData = async () => {
    if (cachedData) {
        return cachedData;
    }
    try {
        const response = await axios.get(apiUrl);
        cachedData = response.data;
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
};
