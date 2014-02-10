SLIDER_FIELDS = {
	title: {
		'default': fixie.fetchPhrase
	},
	description: {
		'default': fixie.fetchPhrase
	},
	link: {
		type: 'text',
		label: 'Link',
		hint: '(where clicking the slide should take you)',
		'default': '/'
	},
	image: {
		type: 'text',
		label: 'Google+ album image URL',
		hint: '(When you view an image in a google+ album, right click it and select copy image URL. It should be something like: https://lh3.googleusercontent.com/-YdN3Y95BrO8/UnDPuh08jVI/AAAAAAAAOnQ/hiyVg3k3Wiw/w958-h539-no/9.jpg)',
		'default': 'https://lh3.googleusercontent.com/-YdN3Y95BrO8/UnDPuh08jVI/AAAAAAAAOnQ/hiyVg3k3Wiw/w958-h539-no/9.jpg'
	},
	weight: {
		post: function (val) { return parseInt(val, 10); },
		hint: 'The heavier the element, the later it will appear',
		'default': 100
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

var intervalId;

var nextSlide = function () {
	console.log('next slide');
	var $prevSlide = $('.slider .slide.active');
	var $nextSlide = $prevSlide.next();
	if (!$nextSlide.length) {
		$nextSlide = $($('.slider .slide')[0]);
	}
	$prevSlide.removeClass('active');
	$nextSlide.addClass('active');
	Meteor.setTimeout(function () {
		$nextSlide.find('.image').css({translate: [0, 0]});
	}, 1);
	Meteor.setTimeout(function () {
		$prevSlide.find('.image').css({transform: ''});
	}, 1000);
};

var stopSlider = function () {
	Meteor.clearInterval(intervalId);
};


Template.slider.rendered = function () {
	var slideInterval = AppCollection.findOne({key: 'sliderInterval'}).value;
	console.log(slideInterval);
	slideInterval = Math.max(1000, slideInterval);
	Meteor.clearInterval(intervalId);
	intervalId = Meteor.setInterval(nextSlide, slideInterval);
	nextSlide();
};
Meteor.startup(function () {
	Router.unload(stopSlider);
});