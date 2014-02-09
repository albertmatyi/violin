SLIDER_FIELDS = {
	title: {
		default: fixie.fetchPhrase
	},
	description: {
		default: fixie.fetchPhrase
	},
	link: {
		type: 'text',
		label: 'Link',
		hint: '(where clicking the slide should take you)',
		default: '/'
	},
	image: {
		type: 'text',
		label: 'Google+ album image URL',
		hint: '(When you view an image in a google+ album, right click it and select copy image URL. It should be something like: https://lh3.googleusercontent.com/-YdN3Y95BrO8/UnDPuh08jVI/AAAAAAAAOnQ/hiyVg3k3Wiw/w958-h539-no/9.jpg)',
		default: 'https://lh3.googleusercontent.com/-YdN3Y95BrO8/UnDPuh08jVI/AAAAAAAAOnQ/hiyVg3k3Wiw/w958-h539-no/9.jpg'
	},
	weight: {
		post: function (val) { return parseInt(val); },
		hint: 'The heavier the element, the later it will appear',
		default: 100
	}
};
Template.slide.helpers(_.extend({
	image: function () {
		return this.image;
	}
}, i18n.templateHelperFor('title', 'description')));

Template.slider.rendered = function () {
	var $el = $(this.firstNode);
	var h = $(window).height() * 0.5;
	$el.css({height: h});
	console.log($el);
	console.log(h);
};