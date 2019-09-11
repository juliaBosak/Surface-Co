class Slider {
	constructor(wrap, needCounter) {
		this.wrap = wrap;
		this.needCounter = needCounter;
		this.init();
	}
	init() {
		this.currentSlide = 1;
		this.sliderBlock = this.wrap.querySelector('.slider');
		this.slidersCount = this.sliderBlock.children.length;
		if (this.needCounter) {
			const 
				counter = this.wrap.querySelector('.slider__counter'),
				slidesAmount = counter.querySelector('.slider__amount-slides');
			this.currentSlideBlock = counter.querySelector('.slider__current-slide');
			this.currentSlideBlock.innerHTML = this.currentSlide;
			slidesAmount.innerHTML = this.slidersCount;
			window.addEventListener("resize", () => { 
			this.slide(); 
			});
		}
	}
	slide(direction) {
		this.itemWidth = this.sliderBlock.children[0].offsetWidth;
		if (direction) {
			if (direction == 1 && this.currentSlide == this.slidersCount ) {
				this.sliderBlock.style.left = ''
				this.currentSlide = 1;
			}
			else if (direction == -1 && this.currentSlide == 1) {
				this.sliderBlock.style.left = -(this.slidersCount-1)*this.itemWidth + 'px';
				this.currentSlide = this.slidersCount;
			}
			else {
					this.currentSlide += direction;
					this.sliderBlock.style.left = -(this.currentSlide-1)*this.itemWidth + 'px';
				}
		}
		else {
			this.sliderBlock.style.left = -(this.currentSlide-1)*this.itemWidth + 'px';
		}
		
		if (this.currentSlideBlock) {
			this.currentSlideBlock.innerHTML = this.currentSlide;
		}
	}
}
