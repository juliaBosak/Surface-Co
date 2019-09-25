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