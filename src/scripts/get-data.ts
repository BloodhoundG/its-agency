import axios from 'axios';

import type { ColorsData } from '../types/types.ts';

export const getData = async () => {
    try {
        const response = await axios.get<ColorsData[]>('https://6876620d814c0dfa653be002.mockapi.io/api/colors/colors');

        if (response.status !== 200) {
            throw new Error('Ошибка запроса');
        }

        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const cardsData = (await getData()) || [];

console.log(cardsData);
