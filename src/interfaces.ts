export interface ModernTravelingSliderBaseConfig {
  items: number;
  counter: boolean;
  counterContainer?: Node | string | false;
  nav: boolean;
  navContainer?: Node | string | false;
  controls: boolean;
  controlsContainer?: Node | string | false;
}

export interface ModernTravelingSliderConfig
  extends ModernTravelingSliderBaseConfig {
  responsive?: { [key: string]: ModernTravelingSliderBaseConfig };
  startIndex?: number;
}

export interface SlideInCollection {
  number: number;
  slide: Element;
}
