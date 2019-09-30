class Blog {
	constructor(wrap, breakpoints, countForBreakpoints) {
		this.wrap = wrap;
		this.breakpoints = breakpoints;
		this.countForBreakpoints = countForBreakpoints;
		this.init();
	}
	init() {
		this.postsBlock =  this.wrap.querySelector('.blog__posts');
		this.posts = this.postsBlock.querySelectorAll('.blog__post');
		this.moveButton = this.wrap.querySelector('.page-button');
		this.hideButton = this.wrap.querySelector('.hide-button');
		this.lastPostIndex = this.posts.length - 1;
		this.updatePostCountForShow();
		this.hidePosts();
		let showedPostAmount = this.lastPostIndex+1;
		window.addEventListener("resize", () => { 
			if (this.currentwrapBlockWidth != this.postsBlock.offsetWidth) {
				this.updatePostCountForShow();
				showedPostAmount = this.lastPostIndex+1;
				if (showedPostAmount < this.currentAmount) {
					this.showPosts(this.currentAmount);
				}
				else {
					this.hidePosts(showedPostAmount - this.currentAmount);
				}
			}
		});
	}
	updatePostCountForShow() {
		this.currentwrapBlockWidth = this.postsBlock.offsetWidth;
		this.currentAmount = this.countForBreakpoints[this.breakpoints.findIndex( (elem) => elem == this.currentwrapBlockWidth)];
	}
	showPosts(endIndex = this.posts.length) {
		let nextPostIndex;
		for ( nextPostIndex = this.lastPostIndex + 1; nextPostIndex < endIndex; nextPostIndex++) {
			this.posts[nextPostIndex].classList.remove('fadeInUp');
			this.posts[nextPostIndex].classList.remove('hidden');
			this.posts[nextPostIndex].classList.add('showed');
			this.posts[nextPostIndex].classList.add('fadeInDown');
			this.lastPostIndex = nextPostIndex;
		}
		if (nextPostIndex === this.posts.length) {
			this.moveButton.style.display = 'none';
			this.hideButton.style.display = 'inline-block';	
		}	
	}
	hidePosts(amount = this.posts.length - this.currentAmount) {
		let nextPostIndex;
		for (nextPostIndex = 0; nextPostIndex < amount; nextPostIndex++) {
			this.posts[this.lastPostIndex].classList.remove('showed');
			this.posts[this.lastPostIndex].classList.remove('fadeInDown');
			this.posts[this.lastPostIndex].classList.add('fadeInUp');
			this.posts[this.lastPostIndex].classList.add('hidden');
			this.lastPostIndex = this.lastPostIndex - 1;
		}
			this.hideButton.style.display = 'none';
			this.moveButton.style.display = 'inline-block';
	}
}
class Slider {
	constructor(wrap, needCounter) {
		this.wrap = wrap;
		this.needCounter = needCounter;
		this.init();
	}
	init() {
		this.currentSlide = 1;
		this.sliderBlock = this.wrap.querySelector('.slider');
		let children = this.sliderBlock.querySelectorAll('.slider__item');
		this.slidersCount = Math.ceil(children.length/(Math.round(this.sliderBlock.offsetWidth/children[0].offsetWidth)));
		if (this.needCounter) {
			const 
				counter = this.wrap.querySelector('.slider__counter'),
				slidesAmount = counter.querySelector('.slider__amount-slides');
			this.currentSlideBlock = counter.querySelector('.slider__current-slide');
			this.currentSlideBlock.innerHTML = this.currentSlide;
			slidesAmount.innerHTML = this.slidersCount;
		}
		window.addEventListener("resize", () => { 
			this.slidersCount = Math.ceil(children.length/(Math.floor(this.sliderBlock.offsetWidth/children[0].offsetWidth)));
			this.slide(); 
		});
	}
	slide(direction) {
		this.itemWidth = this.sliderBlock.offsetWidth;
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
class Tabs {
	constructor(tabsWrap) {
		this.tabsWrap = tabsWrap;
		this.init();
	}
	currentTab = 0;
	init() {
		this.tabs = this.tabsWrap.querySelectorAll('.tabs__description-content');
		this.tabsTitles = this.tabsWrap.querySelectorAll('.tabs__title');
		this.tabsTitles[this.currentTab].classList.add('active');
		this.tabs[this.currentTab].classList.add('active');
	}
	showTab(index) {
		this.tabs[this.currentTab].classList.remove('active');
		this.tabsTitles[this.currentTab].classList.remove('active');
		this.currentTab = index;
		this.tabsTitles[this.currentTab].classList.add('active');
		this.tabs[this.currentTab].classList.add('active');
	}

}