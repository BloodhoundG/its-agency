export const initFiltersModal = () => {
    const button = document.querySelector('.card-list__filters-button');

    if (!button) return;

    const onClickOpenModal = () => {
        const body = document.body;
        body.setAttribute('modal-open', '');

        const modal = document.querySelector('.modal-filters') as HTMLElement;

        modal.style.display = 'block';

        setTimeout(() => {
            modal.setAttribute('is-open', '');
        }, 0);

        const onClickCloseModal = (event: Event) => {
            const target = event.target as HTMLElement;

            if (target.classList.contains('modal-filters') || target.classList.contains('modal-filters__handle')) {
                modal.removeAttribute('is-open');

                body.removeAttribute('modal-open');

                modal.removeEventListener('click', onClickCloseModal);

                setTimeout(() => {
                    modal.style.display = 'none';
                }, 200);
            }
        };

        modal.addEventListener('click', onClickCloseModal);
    };

    button.addEventListener('click', onClickOpenModal);
};
