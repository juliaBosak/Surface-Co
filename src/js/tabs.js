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