import {
  canGoTo,
  createStructureSlider,
  getSlidesDOM,
  isNumber
} from './functions/functions';
import {
  ModernTravelingSliderBaseConfig,
  ModernTravelingSliderConfig
} from 'interfaces';
import CollectionSlides from './CollectionSlides';
import './styles/root.scss';
import SlideWindow from './SlideWindow';

const CLASSES = {
  INIT: 'ModernTravelingSlider',
  SLIDE: 'ModernTravelingSlider-Slide'
};

class ModernTravelingSlider {
  public root: HTMLElement;
  private readonly settings: ModernTravelingSliderConfig;
  protected breakpoints: number[] = [0];
  protected breakpoint: number = 0;
  public currentConfig: ModernTravelingSliderBaseConfig;
  protected elements: { [key: string]: HTMLElement } = {};
  protected collectionSlides: CollectionSlides;
  protected windows: SlideWindow[] = [];
  protected currentIndex: number = 0;

  public constructor(
    queryString: string,
    settings: ModernTravelingSliderConfig
  ) {
    this.root = document.querySelector(queryString);
    this.settings = settings;
    if (isNumber(settings.startIndex)) {
      this.currentIndex = settings.startIndex;
    }
    const arrSlides = getSlidesDOM(this.root);
    this.collectionSlides = new CollectionSlides(arrSlides, this.root);
    this.elements.inner = createStructureSlider();
    this.root.appendChild(this.elements.inner);
    this.elements.windows = this.root.querySelector(
      '.ModernTravelingSlider-Windows'
    );
    this.breakpoints = ModernTravelingSlider.getBreakpoints(this.settings);
    this.rebuild();
    this.addListeners();
    this.root.classList.add(CLASSES.INIT);
  }

  public rebuild(): void {
    const breakpoint = this.getCurrentBreakpoint();
    if (this.breakpoint !== breakpoint) {
      this.breakpoint = breakpoint;
      this.currentConfig = this.getConfigByBreakpoint(this.breakpoint);
      this.windows.forEach(windowEl => {
        windowEl.destructor();
      });
      this.windows = [];
      const needSlidesLength = this.getNumberNeedWindows();
      const width = 100 / needSlidesLength;
      for (let i = 0; i < needSlidesLength; i++) {
        const slideWindow = new SlideWindow(
          this.elements.windows,
          this.collectionSlides.getSlideByNumber(i),
          this.collectionSlides
        );
        slideWindow.root.style.width = width + '%';
        this.windows.push(slideWindow);
      }
      console.log('rebuild view', this);
    }
  }

  protected getNumberNeedWindows(): number {
    return this.canGoTo()
      ? this.currentConfig.items
      : this.collectionSlides.getNumberOfSlides();
  }

  protected canGoTo(): boolean {
    return this.collectionSlides.getNumberOfSlides() > this.currentConfig.items;
  }

  public goTo(number: number): void {
    const checkCan = canGoTo(
      number,
      this.collectionSlides.getNumberOfSlides(),
      this.currentConfig.items,
      this.currentIndex
    );

    if (this.canGoTo() && checkCan) {
      console.log('can go to');
    } else {
      console.warn("I can't go");
    }
  }

  protected getCurrentBreakpoint(): number {
    const width = window.innerWidth;
    return Array.from(this.breakpoints)
      .reverse()
      .filter(value => value < width)
      .shift();
  }

  protected getConfigByBreakpoint(
    breakpoint: number
  ): ModernTravelingSliderBaseConfig {
    if (breakpoint === 0) {
      return Object.assign(
        ModernTravelingSlider.defaultSettings(),
        this.settings
      );
    }
    if (this.breakpoints.indexOf(breakpoint) !== -1) {
      const usesBreakpoints = this.breakpoints.filter(
        value => value <= breakpoint
      );
      const arrSettings = usesBreakpoints.map(breakpoint => {
        if (breakpoint === 0) {
          return this.getConfigByBreakpoint(breakpoint);
        }
        return this.settings.responsive[breakpoint];
      });
      return Object.assign({}, ...arrSettings);
    }
    throw new Error(`No this breakpoint ${breakpoint}`);
  }

  protected addListeners(): void {
    window.addEventListener('resize', this.handleChangeSizePage);
  }

  protected handleChangeSizePage = (): void => {
    this.rebuild();
  };

  protected static getBreakpoints(
    settings: ModernTravelingSliderConfig
  ): number[] {
    let result = [0];
    if (typeof settings.responsive === 'object') {
      const keys = Object.keys(settings.responsive).map(numb => parseInt(numb));
      return [...result, ...keys];
    }
    return result;
  }

  public static defaultSettings(): ModernTravelingSliderBaseConfig {
    return {
      items: 1,
      counter: false,
      counterContainer: false,
      nav: false,
      navContainer: false,
      controls: false,
      controlsContainer: false
    };
  }
}

export default ModernTravelingSlider;
