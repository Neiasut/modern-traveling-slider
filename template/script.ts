import ModernTravelingSlider from '../src/ModernTravelingSlider';

const slider = new ModernTravelingSlider('#testSlider', {
  items: 1,
  controls: true,
  nav: true,
  counter: true,
  responsive: {
    768: {
      items: 2,
      controls: true,
      nav: true,
      counter: true
    }
  }
});
console.log(slider);

document.addEventListener('click', () => {
  slider.goTo(3);
});
