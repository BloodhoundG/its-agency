import { activeFilters } from './data/active-filters.ts';
import { applyFilters } from './apply-filters.ts';

export const initCardFilters = () => {
    const modal = document.querySelector('.modal-filters') as HTMLElement;

    const filterInputs = modal.querySelectorAll('.modal-filters__input');

    filterInputs.forEach((input) => {
        const inputName = input.getAttribute('name') as keyof typeof activeFilters;

        const onFilterChange = () => {
            activeFilters[inputName] = !activeFilters[inputName];
            applyFilters();
        };

        input.addEventListener('change', onFilterChange);
    });
};
