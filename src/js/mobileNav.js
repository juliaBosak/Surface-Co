let 
	openButton = document.getElementById('mobile-nav__open'),
	mobileNav = document.getElementById('mobile-nav__items'),
	closeButton = document.getElementById('mobile-nav__close');
openButton.addEventListener('click', () => {
	mobileNav.classList.remove('mobile-nav_is-closed');
	mobileNav.classList.add('mobile-nav_is-opened');
})
closeButton.addEventListener('click', () => {
	mobileNav.classList.remove('mobile-nav_is-opened');
	mobileNav.classList.add('mobile-nav_is-closed');
})