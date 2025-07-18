import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { heroSliderData } from './data/hero-slider-data.ts';

export const initSwiper = (sliderClass: string) => {
    const slideList = document.querySelector('.swiper-wrapper') as HTMLElement;

    heroSliderData.forEach((slideData) => {
        const slideElement = document.createElement('div') as HTMLDivElement;
        slideElement.classList.add('swiper-slide');

        slideElement.innerHTML = `
<div class="swiper-slide__title">${slideData.title}</div> 
<div class="swiper-slide__description">${slideData.description}</div> 
    `;

        slideList.appendChild(slideElement);
    });

    new Swiper(sliderClass, {
        modules: [Navigation, Pagination],
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
};
