import { ModernTravelingSliderBaseConfig } from '../interfaces';

export const getSlidesDOM = (element: HTMLElement): HTMLElement[] => {
  return Array.from(element.querySelectorAll('*'));
};

export function isModernTravelingSliderBaseConfig(
  object: ModernTravelingSliderBaseConfig
): object is ModernTravelingSliderBaseConfig {
  return typeof object === 'object' && typeof object.items === 'number';
}

const createInner = (): HTMLElement => {
  const inner = document.createElement('div');
  inner.classList.add('ModernTravelingSlide-Inner');
  return inner;
};

export function wrapArrElements(nodes: HTMLElement[]): HTMLElement {
  const storageSlides = document.createElement('div');
  storageSlides.classList.add('ModernTravelingSlider-StorageSlides');
  nodes.forEach(node => {
    storageSlides.appendChild(node);
  });
  return storageSlides;
}

export function createStructureSlider(): HTMLElement {
  const inner = createInner();
  inner.innerHTML = '<div class="ModernTravelingSlider-Windows"></div>';
  return inner;
}

export const constructSlideWindow = (): { [key: string]: HTMLElement } => {
  const slideWindow = document.createElement('div');
  slideWindow.classList.add('ModernTravelingSlider-SlideWindow');
  slideWindow.innerHTML =
    '<div class="ModernTravelingSlider-SlideWindowCurrent"></div>' +
    '<div class="ModernTravelingSlider-SlideWindowNext"></div>';
  return {
    slide: slideWindow,
    current: slideWindow.querySelector(
      '.ModernTravelingSlider-SlideWindowCurrent'
    ),
    next: slideWindow.querySelector('.ModernTravelingSlider-SlideWindowNext')
  };
};

export const isNumber = (x: any): x is number => typeof x === 'number';

const firstLessOrEqualThanSecond = (a: number, b: number): boolean => !(a > b);
const moreThanZero = (number: number): boolean =>
  firstLessOrEqualThanSecond(0, number);
const checkStep = (a: number, b: number): boolean => a % b === 1;
const equalCompare = <T>(a: T, b: T): boolean => a === b;

export const canGoTo = (
  goNumber: number,
  numberSlides: number,
  numberItems: number,
  currentIndex: number
): boolean => {
  return (
    firstLessOrEqualThanSecond(goNumber, numberSlides) &&
    moreThanZero(goNumber) &&
    checkStep(goNumber, numberItems) &&
    !equalCompare(goNumber, currentIndex + 1)
  );
};
