import type { ColorsData } from '../types/types.ts';

import { activeFilters } from './data/active-filters.ts';
import { cardsData } from './get-data.ts';
import { sortFilter } from './data/sort-filter.ts';

import { addProductInBasket } from './data/basket-data.ts';

export const applyFilters = () => {
    const cardList = document.querySelector('.card-list__list') as HTMLElement;
    const cardListCounter = document.querySelector('.card-list__counter') as HTMLElement;

    cardList.innerHTML = '';

    let productsCount = 0;

    cardsData
        .filter((card) => {
            for (const filterKey in activeFilters) {
                if (activeFilters[filterKey as keyof typeof activeFilters]) {
                    if (!card[filterKey as keyof typeof card]) {
                        return false;
                    }
                }
            }

            return true;
        })
        .sort((a: ColorsData, b: ColorsData) => {
            if (sortFilter.filter === 'expensive') {
                return b.price - a.price;
            } else if (sortFilter.filter === 'cheap') {
                return a.price - b.price;
            } else if (sortFilter.filter === 'popular') {
                if (!a.isPopular && b.isPopular) {
                    return 1;
                } else if (a.isPopular && !b.isPopular) {
                    return -1;
                }
            } else if (sortFilter.filter === 'new') {
                const aTimeStamp = Date.parse(a.createData);
                const bTimeStamp = Date.parse(b.createData);

                return bTimeStamp - aTimeStamp;
            }

            return 0;
        })
        .forEach((card) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card-list__item', 'card');

            productsCount += 1;

            cardElement.innerHTML = `
<div class="card__image-wrapper">
    <img
        src="${card.image}"
        alt="Изображение банки краски"
        class="card__image"
    />
</div>
<div class="card__description">${card.name}</div>
<div class="card__price-wrapper">
    <span class="card__price">${card.price} &#8381;</span>
    <span class="card__button-buy button-add"></span>
</div>
        `;

            const cardButton = cardElement.querySelector('.card__button-buy.button-add') as HTMLElement;

            cardButton.addEventListener('click', () => addProductInBasket(card));

            cardList.appendChild(cardElement);
        });

    cardListCounter.textContent = `Товаров: ${productsCount}`;
};
