export interface HeroSliderData {
    title: string;
    description: string;
}

export type SortFilterValue = 'expensive' | 'cheap' | 'popular' | 'new';

export interface SortFilter {
    filter: SortFilterValue;
}

export interface ProductFilters {
    inStock: boolean;
    isContract: boolean;
    isExclusive: boolean;
    isNew: boolean;
    onSale: boolean;
}

export interface ColorsData extends ProductFilters {
    id: number;
    name: string;
    price: number;
    image: string;
    isPopular: boolean;
    createData: string;
}

export interface BasketColorsData extends ColorsData {
    count: number;
}
