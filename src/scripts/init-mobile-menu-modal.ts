export const initMobileMenuModal = () => {
    const menuButton = document.querySelector('.header__burger-button') as HTMLButtonElement;

    const onCLickButton = (event: Event) => {
        event.stopPropagation();

        document.body.setAttribute('modal-open', '');

        const mobileMenuModal = document.querySelector('.mobile-menu-modal') as HTMLDivElement;

        mobileMenuModal.style.display = 'block';

        setTimeout(() => {
            mobileMenuModal.setAttribute('is-open', '');
        }, 0);

        const onClickCloseModal = () => {
            mobileMenuModal.removeAttribute('is-open');

            document.body.removeAttribute('modal-open');

            document.body.removeEventListener('click', onClickCloseModal);
        };

        document.body.addEventListener('click', onClickCloseModal);
    };

    menuButton.addEventListener('click', onCLickButton);
};
