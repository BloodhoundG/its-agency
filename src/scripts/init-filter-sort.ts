import { sortFilter } from './data/sort-filter.ts';
import type { SortFilterValue } from '../types/types.ts';
import { applyFilters } from './apply-filters.ts';

export const initFilterSort = () => {
    //
    const sortElement = document.querySelector('.card-list__sort') as HTMLElement;

    const onClickSortButton = (event: Event) => {
        event.stopPropagation();

        document.body.setAttribute('modal-open', '');

        const modal = document.querySelector('.modal-sort-filter') as HTMLElement;

        const { top, right } = sortElement.getBoundingClientRect();

        modal.style.top = `${top}px`;
        modal.style.left = `${right}px`;
        modal.style.display = 'flex';

        setTimeout(() => {
            modal.setAttribute('is-open', '');
        });

        const closeModal = () => {
            document.body.removeAttribute('modal-open');

            modal.removeAttribute('is-open');

            document.body.removeEventListener('click', onClickSortModal);

            setTimeout(() => {
                modal.style.display = 'none';
            }, 0);
        };

        const onClickSortModal = (event: Event) => {
            const target = event.target as HTMLElement;

            if (!target.classList.contains('modal-sort-filter__sort-item')) {
                closeModal();
                return;
            }

            const sortTextElement = document.querySelector('.card-list__sort-text') as HTMLElement;
            sortTextElement.textContent = target.textContent;

            const filterValue = target.getAttribute('data-sort') as SortFilterValue;
            sortFilter.filter = filterValue;

            const lastCurrentItem = modal.querySelector('.modal-sort-filter__sort-item.is-active') as HTMLElement;
            lastCurrentItem.classList.remove('is-active');

            const newCurrentItem = modal.querySelector(
                `.modal-sort-filter__sort-item[data-sort="${filterValue}"]`
            ) as HTMLElement;
            newCurrentItem.classList.add('is-active');

            applyFilters();

            closeModal();
        };

        document.body.addEventListener('click', onClickSortModal);
    };

    sortElement.addEventListener('click', onClickSortButton);
};
