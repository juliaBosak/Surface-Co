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

