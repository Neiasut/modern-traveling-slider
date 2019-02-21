import { constructSlideWindow } from './functions/functions';
import { SlideInCollection } from './interfaces';
import CollectionSlides from './CollectionSlides';

class SlideWindow {
  public root: HTMLElement;
  protected nextWrapper: HTMLElement = null;
  protected currentWrapper: HTMLElement = null;
  protected inAction: boolean = false;
  protected currentCollection: SlideInCollection = null;
  protected nextCollection: SlideInCollection = null;
  protected collectionSlides: CollectionSlides = null;

  public constructor(
    parent: HTMLElement,
    currentSlide: SlideInCollection,
    collectionSlides: CollectionSlides
  ) {
    const elements = constructSlideWindow();
    this.root = elements.slide;
    this.nextWrapper = elements.next;
    this.currentWrapper = elements.current;
    parent.appendChild(this.root);
    this.setCurrentSlide(currentSlide);
    this.collectionSlides = collectionSlides;
  }

  protected setCurrentSlide(slide: SlideInCollection): SlideInCollection {
    const beforeCurrent = this.currentCollection;
    this.currentCollection = slide;
    this.currentWrapper.appendChild(this.currentCollection.slide);

    return beforeCurrent;
  }

  public next(nextSlide: SlideInCollection | undefined): void {
    console.log(nextSlide, 'next');
  }

  public destructor(): void {
    this.collectionSlides.returnSlideToCollection(this.currentCollection);
    if (this.inAction) {
      this.collectionSlides.returnSlideToCollection(this.nextCollection);
    }
    this.root.parentNode.removeChild(this.root);
  }
}

export default SlideWindow;
