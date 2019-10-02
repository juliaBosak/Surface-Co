window.addEventListener('DOMContentLoaded', function() {
	(function() {
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
	(function() {
		const
			playButton = document.getElementById('about-us_video-button'),
			videoWrap = document.getElementById('video-wrap');
			let iframe;
			playButton.addEventListener('click', () => {
				if (!iframe) {
					iframe = document.createElement('iframe');
					iframe.classList.add('about-us__iframe', 'video__iframe');
					iframe.setAttribute('allow', "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");
					iframe.setAttribute('frameborder', '0');
					iframe.setAttribute('allowfullscreen', '');
					iframe.setAttribute('autoplay', '1');
					iframe.setAttribute('src', 'https://www.youtube.com/embed/_yewrxf7dsQ?autoplay=1');
					videoWrap.prepend(iframe);
					iframe.style.position = 'relative';
					iframe.style.zIndex = '3';

				}
			})
	}) ();
});
