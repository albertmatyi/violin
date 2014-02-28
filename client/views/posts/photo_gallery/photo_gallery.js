PHOTO_GALLERY_FIELDS = {
	title: {
		'default': fixie.fetchPhrase
	},
	username: {
		type: 'text',
		label: 'Google+ username',
		hint: '(eg. write: johndoe if your gmail address is johndoe@gmail.com)',
		'default': 'albertmatyi'
	},
	albumId: {
		type: 'text',
		label: 'Google+ album ID',
		hint: 'When you view an album, this the number that comes after "albums" in the url. Ex: https://plus.google.com/u/0/photos/110836571215849032642/albums/5940476182069855361',
		'default': '5940476182069855361'
	},
	weight: {
		post: function (val) { return parseInt(val, 10); },
		hint: 'The heavier the element, the later it will appear',
		'default': 100
	}
};

var mock = false;
var MOCK_GALLERY = {
	feed: {
		entry: _.map([0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9], function (i) {
			return {
				content: {src: '/pix/test/' + i + '.jpg'}
			};
		})
	}
};

var baseUrl = 'https://picasaweb.google.com/data/feed/api/user/:user/albumid/:albumId?alt=json&callback=?&v=2';

var getAlbum = function (post) {
	var salbumId = 'album' + post.username + post.albumId;

	var data = Session.get(salbumId);
	if (!data) {
		if (mock) {
			data = MOCK_GALLERY;
		} else {
			var url = baseUrl.replace(/\:user/gi, post.username).replace(/\:albumid/gi, post.albumId);
			$.getJSON(url).done(function(data) {
				return Session.set(salbumId, data);
			});
		}
	}
	return data;
};

Template.photoGalleryListItem.helpers(_.extend({
	album: function () { return getAlbum(this); }
}, i18n.templateHelperFor('title')));

var images = function () {
	var data = Session.get('currentGallery');
	return data ? data.feed.entry:{feed:{entry:[]}};
};

Template.galleryViewer.helpers({
	selectedImage: function () {
		var imgIdx = Session.get('gallerySelection');
		var img = images()[imgIdx];
		var gh = Session.get('galleryH');
		if (img) {
			img = img.content.src;
			if (!mock) {
				img = img.replace(/\/([^/]*)$/i, '/h' + gh + '/$1');
				console.log(img);
			}
			return img;
		} else {
			return '/pix/loading.png';
		}
	}
});

var select = function (newIdx) {
	var imgs = images();
	newIdx = (imgs.length + newIdx) % imgs.length;

	Session.set('gallerySelection', newIdx);

	$('.thumbnails .thumbnail.active').removeClass('active');
	var $actEl = $($('.thumbnails .thumbnail')[newIdx]).addClass('active');
	var left = $actEl.parent().outerWidth() * (newIdx -1);
	var $row = $actEl.parents('.row').first();
	$row.animate({scrollLeft: left});
};

var changeSelection = function (delta) {
	var currentIdx = Session.get('gallerySelection');
	var newIdx = currentIdx + delta;
	select(newIdx);
};

Template.galleryViewer.events({
	'click .left': function (e) {
		e.preventDefault();
		changeSelection(-1);
	},
	'click .right': function (e) {
		e.preventDefault();
		changeSelection(1);
	}
});

var changeLeft = function () {
	changeSelection(-1);
};
var changeRight = function () {
	changeSelection(1);
};
var keyHandler = function (e) {
	if (e.keyCode === 37) {
		changeLeft();
	} else if (e.keyCode === 39) {
		changeRight();
	}
};

Template.galleryViewer.rendered = function () {
	$('body').off('keyup', keyHandler);
	$('body').on('keyup', keyHandler);
	Hammer(this.firstNode).off('swipeleft', changeRight);
	Hammer(this.firstNode).off('swiperight', changeLeft);
	Hammer(this.firstNode).on('swipeleft', changeRight);
	Hammer(this.firstNode).on('swiperight', changeLeft);
	$('.thumbnail', this.firstNode).css({height: Session.get('galleryH') + 10 });
};

var pageLeft = function () {

};

var page = function (dir) {
	var $row = $('.thumbnails .row');
	var left = $row.width() / 2;
	$row.animate({scrollLeft: $row.scrollLeft() + left * dir});
};

var pageLeft = function () {
	page(-1);
};

var pageRight = function () {
	page(1);
};

Template.thumbnails.rendered = function () {
	Hammer(this.firstNode).off('swipeleft', pageRight);
	Hammer(this.firstNode).off('swiperight', pageLeft);
	Hammer(this.firstNode).on('swipeleft', pageRight);
	Hammer(this.firstNode).on('swiperight', pageLeft);
};

Template.thumbnails.helpers({
	thumbnails: function () {
		var data = Session.get('currentGallery');
		if (data) {
			Meteor.setTimeout(function () {
				if (!Session.get('gallerySelection')) {
					Session.set('gallerySelection', 0);
					changeSelection(0);
				}
			}, 1000);
			return data.feed.entry;
		}
	},
	image: function () {
		var thumb = this.content.src;
		var thumbSize = Session.get('thumbSize');
		if (!mock) {
			thumb = thumb.replace(/\/([^/]*)$/i, '/s' + thumbSize + '-c/$1');
		}
		return thumb;
	}
});

Template.thumbnails.events({
	'click .image': function (ev) {
		select($(ev.target).parent().parent().index() - 2);
	},
	'click .control.left': pageLeft,
	'click .control.right': pageRight
});

var setSizes = function () {
	Session.set('thumbSize', $(window).width() >= 1200 ? 110:90);

	var vh = parseInt($(window).height() * 0.7, 10);
	Session.set('galleryH', vh);
};

Meteor.startup(function () {
	setSizes();
	$(window).on('resize', setSizes);
});


// http://img.youtube.com/vi/4q8_OZfIp9Y/hqdefault.jpg
Router.after(function () {
	Session.set('currentGallery', getAlbum(this.data().post));
}, {
	only: ['gallery']
});

Router.unload(function () {
	$('body').off('keypress', keyHandler);
	Hammer(this.firstNode).off('swipeleft', pageRight);
	Hammer(this.firstNode).off('swiperight', pageLeft);
	Hammer(this.firstNode).off('swipeleft', changeRight);
	Hammer(this.firstNode).off('swiperight', changeLeft);
}, {
	only: ['gallery']
});