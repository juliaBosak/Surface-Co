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
( function() {
let 
	body = document.querySelector('body'),
	openButton = document.getElementById('mobile-nav__open'),
	mobileNav = document.getElementById('mobile-nav__items'),
	closeButton = document.getElementById('mobile-nav__close');
openButton.addEventListener('click', () => {
	mobileNav.classList.remove('mobile-nav_is-closed');
	mobileNav.classList.add('mobile-nav_is-opened');
	body.style.overflow = 'hidden';
})
closeButton.addEventListener('click', () => {
	body.style.overflow = 'visible';
	mobileNav.classList.remove('mobile-nav_is-opened');
	mobileNav.classList.add('mobile-nav_is-closed');
})
})();
(function() {
const 
	board = document.querySelector('.board'),
	wrap = board.querySelector('.slider__wrap'),
	boardPrev = board.querySelector('.slider__button-prev'),
	boardNext = board.querySelector('.slider__button-next'),
	slider = new Slider(wrap, true);

boardNext.addEventListener('click', () => {
	slider.slide(1);
})
boardPrev.addEventListener('click', () => {
	slider.slide(-1);
})
}) ();

(function() {
	const 
		tabsWraps = document.querySelectorAll('.tabs');
	let 
		tabs = [],
		tabsTitles = [];
	for (let index = 0; index < tabsWraps.length; index++) {
		tabsTitles[index] = tabsWraps[index].querySelectorAll('.tabs__title');
		tabs[index] = new Tabs(tabsWraps[index]);
		for (let i = 0; i < tabsTitles[index].length; i++) {
			tabsTitles[index][i].addEventListener('click', () => {
				tabs[index].showTab(i);
			})
		}
	}
}) ();

(function() {
	const 
		videoButton = document.getElementById('about-us_video-button'),
		video = document.getElementById('about-us_video');

		videoButton.addEventListener('click', () => {
			video.style.position = 'relative';
			video.style.zIndex = '3';
		})	
}) ();

(function() {
const 
	ourTeam = document.querySelector('.our-team'),
	wrap = ourTeam.querySelector('.slider__wrap'),
	prev = ourTeam.querySelector('.slider__button-prev'),
	next = ourTeam.querySelector('.slider__button-next'),
	slider = new Slider(wrap, false);

next.addEventListener('click', () => {
	slider.slide(1);
})
prev.addEventListener('click', () => {
	slider.slide(-1);
})
}) ();
(function() {
const 
	blogBlock = document.querySelector('.blog'),
	moreButton = blogBlock.querySelector('.page-button'),
	hideButton = blogBlock.querySelector('.hide-button'),
	breakpoints = [870, 570, 270],
	countForBreakpoints = [3, 2, 1],
	showAll = true,
	blog = new Blog(blogBlock, breakpoints, countForBreakpoints);

moreButton.addEventListener('click', () => {
	blog.showPosts();
})
hideButton.addEventListener('click', () => {
	blog.hidePosts();
})
}) ();

