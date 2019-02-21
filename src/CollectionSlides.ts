import { SlideInCollection } from './interfaces';
import { wrapArrElements } from './functions/functions';

class CollectionSlides {
  protected collection: SlideInCollection[];
  public root: Element;

  public constructor(slides: HTMLElement[], root) {
    this.collection = slides.map((slide, i) => ({
      number: i,
      slide
    }));
    this.root = wrapArrElements(slides);
    root.appendChild(this.root);
  }

  public getSlideByNumber(numb: number): SlideInCollection {
    return this.collection.filter(element => element.number === numb).shift();
  }

  public getNumberOfSlides(): number {
    return this.collection.length;
  }

  public returnSlideToCollection(slide: SlideInCollection): void {
    this.root.appendChild(slide.slide);
  }
}

export default CollectionSlides;
