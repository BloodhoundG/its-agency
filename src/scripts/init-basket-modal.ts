import { basketData, updateBasketCount, resetBasketCount } from './data/basket-data.ts';

export const initBasketModal = () => {
    const basketButton = document.querySelector('.header__control-basket') as HTMLElement;

    const onClickBasketButton = () => {
        document.body.setAttribute('modal-open', '');

        const basketModal = document.querySelector('.basket-modal') as HTMLElement;
        const totalCountElement = basketModal.querySelector('.basket-modal__total-price') as HTMLElement;

        basketModal.style.display = 'flex';

        setTimeout(() => {
            basketModal.setAttribute('is-open', '');
        });

        const buttonClose = basketModal.querySelector('.basket-modal__button-close') as HTMLElement;

        const ordersList = basketModal.querySelector('.basket-modal__list') as HTMLElement;

        const renderOrdersList = () => {
            ordersList.innerHTML = '';
            let totalCount = 0;

            basketData.forEach((productItem) => {
                if (productItem.count > 0) {
                    totalCount += (productItem.price * 100 * productItem.count) / 100;
                }

                const item = document.createElement('div');
                item.classList.add('basket-modal__item');

                if (productItem.count === 0) {
                    item.innerHTML = `
<div class="basket-modal__image-wrapper repeat">
    <img class="basket-modal__image" src="${productItem.image}" alt="Изображение товара" />
</div>

<div class="basket-modal__wrapper repeat">
    <div class="basket-modal__description">
        <div class="basket-modal__name">${productItem.name}</div>
        <div class="basket-modal__price">${productItem.price}</div>
    </div>

    <div class="basket-modal__controls">
        <div class="basket-modal__control-decrement"></div>
        <div class="basket-modal__counter">1</div>
        <div class="basket-modal__control-increment"></div>
    </div>
</div>

<div class="basket-modal__repeat">
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 1L21 5L17 9" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3 11V9C3 7.93913 3.42143 6.92172 4.17157 6.17157C4.92172 5.42143 5.93913 5 7 5H21" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7 23L3 19L7 15" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21 13V15C21 16.0609 20.5786 17.0783 19.8284 17.8284C19.0783 18.5786 18.0609 19 17 19H3" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</div>
                    `;
                    const repeatButton = item.querySelector('.basket-modal__repeat') as HTMLElement;

                    const onClickRepeatButton = () => {
                        productItem.count = 1;
                        updateBasketCount(1);
                        renderOrdersList();
                    };

                    repeatButton.addEventListener('click', onClickRepeatButton);

                    ordersList.appendChild(item);
                    return;
                }

                item.innerHTML = `
<div class="basket-modal__image-wrapper">
    <img class="basket-modal__image" src="${productItem.image}" alt="Изображение товара" />
</div>

<div class="basket-modal__wrapper">
    <div class="basket-modal__description">
        <div class="basket-modal__name">${productItem.name}</div>
        <div class="basket-modal__price">${(productItem.price * 100 * productItem.count) / 100}</div>
    </div>

    <div class="basket-modal__controls">
        <div class="basket-modal__control-decrement"></div>
        <div class="basket-modal__counter">${productItem.count}</div>
        <div class="basket-modal__control-increment"></div>
    </div>
</div>

<div class="basket-modal__delete"></div>
    `;
                const controlIncrement = item.querySelector('.basket-modal__control-increment') as HTMLElement;
                const controlDecrement = item.querySelector('.basket-modal__control-decrement') as HTMLElement;
                const counter = item.querySelector('.basket-modal__counter') as HTMLElement;
                const price = item.querySelector('.basket-modal__price') as HTMLElement;
                const deleteButton = item.querySelector('.basket-modal__delete') as HTMLElement;

                const updateTextContent = () => {
                    counter.textContent = productItem.count.toString();
                    price.textContent = ((productItem.price * 100 * productItem.count) / 100).toString();
                    totalCountElement.textContent = totalCount.toFixed(2).toString();
                };

                const onClickDeleteOrder = () => {
                    totalCount -= (productItem.price * 100 * productItem.count) / 100;
                    updateBasketCount(-productItem.count);

                    productItem.count = 0;

                    updateTextContent();
                    renderOrdersList();
                };

                deleteButton.addEventListener('click', onClickDeleteOrder);

                const changeOrderCount = (step: 1 | -1) => {
                    if (step === -1 && productItem.count - 1 < 0) {
                        return;
                    }

                    totalCount += productItem.price * step;
                    productItem.count += step;

                    updateTextContent();
                    updateBasketCount(step);

                    if (productItem.count === 0) {
                        renderOrdersList();
                    }
                };

                const changeIncrement = () => changeOrderCount(1);
                const changeDecrement = () => changeOrderCount(-1);

                controlIncrement.addEventListener('click', changeIncrement);
                controlDecrement.addEventListener('click', changeDecrement);

                ordersList.appendChild(item);
            });

            const clearButton = document.querySelector('.basket-modal__clear') as HTMLElement;

            const onClickClearList = () => {
                basketData.forEach((productItem) => {
                    productItem.count = 0;
                    totalCountElement.textContent = '0';
                });

                resetBasketCount();
                renderOrdersList();
            };

            clearButton.addEventListener('click', onClickClearList);

            totalCountElement.textContent = `${totalCount.toFixed(2)}`;
        };

        renderOrdersList();

        const closeModal = () => {
            basketModal.removeAttribute('is-open');

            document.body.removeAttribute('modal-open');

            buttonClose.addEventListener('click', closeModal);
        };

        buttonClose.addEventListener('click', closeModal);
    };

    basketButton.addEventListener('click', onClickBasketButton);
};
