import type { BasketColorsData, ColorsData } from '../../types/types.ts';

let basketCount = 0;

export const basketData: BasketColorsData[] = [];

const updateHTML = () => {
    const basketCounter = document.querySelector('.header__control-basket') as HTMLElement;
    const basketModalCounter = document.querySelector('.basket-modal__orders-count') as HTMLElement;

    basketCounter.textContent = basketCount.toString();
    basketModalCounter.textContent = `Товары: ${basketCount.toString()}`;
};

export const updateBasketCount = (updateStep: number) => {
    basketCount += updateStep;

    updateHTML();
};

export const resetBasketCount = () => {
    basketCount = 0;

    updateHTML();
};

export const addProductInBasket = (cardData: ColorsData) => {
    const dataObject = basketData.find((item) => item.id === cardData.id);

    if (!dataObject) {
        basketData.push({
            ...cardData,
            count: 1,
        });
    } else {
        dataObject.count += 1;
    }

    updateBasketCount(1);
};
