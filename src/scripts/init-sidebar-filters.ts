import { activeFilters } from './data/active-filters.ts';
import { applyFilters } from './apply-filters.ts';

export const initSidebarFilters = () => {
    const sidebarFilters = document.querySelector('.card-list__sidebar-filters') as HTMLElement;

    const filterInputs = sidebarFilters.querySelectorAll('.card-list__input');

    filterInputs.forEach((input) => {
        const inputName = input.getAttribute('name') as keyof typeof activeFilters;

        const onFilterChange = () => {
            activeFilters[inputName] = !activeFilters[inputName];
            applyFilters();
        };

        input.addEventListener('change', onFilterChange);
    });
};
