var baseUrl = 'https://picasaweb.google.com/data/feed/api/user/:user/albumid/:albumId?alt=json&callback=?&v=2';

var getAlbum = function () {
	var salbumId = 'album' + this.username + this.albumId;

	var data = Session.get(salbumId);
	if (!data) {
		var url = baseUrl.replace(/\:user/gi, this.username).replace(/\:albumid/gi, this.albumId);
		$.getJSON(url).done(function(data) {
			return Session.set(salbumId, data);
		});
	}
	return data;
};

Template.photoGalleryListItem.helpers(_.extend({
	album: getAlbum
}, i18n.templateHelperFor('title')));

Template.videoGalleryListItem.helpers(_.extend({}, i18n.templateHelperFor('title')));

Template.galleryViewer.helpers({
	selectedImage: function () {
		var img = Session.get('gallerySelection');
		var gh = Session.get('galleryH');
		if (img) {
			img = img.content.src.replace(/\/([^/]*)$/i, '/h' + gh + '/$1');
			console.log(img);
			return img;
		} else {
			return '/pix/loading.png';
		}
	}
});

Template.galleryViewer.rendered = function () {
	$('.thumbnail', this.firstNode).css({height: Session.get('galleryH') + 10});
};

Template.thumbnails.helpers({
	thumbnails: function () {
		var data = getAlbum.call(this);
		if (data) {
			setTimeout(function () {
				if (!Session.get('gallerySelection')) {
					Session.set('gallerySelection', data.feed.entry[0]);
				}
			}, 1000);
			return data.feed.entry;
		}
	},
	image: function () {
		var thumb = this.content.src;
		var thumbSize = Session.get('thumbSize');
		thumb = thumb.replace(/\/([^/]*)$/i, '/s' + thumbSize + '-c/$1');
		return thumb;
	}
});

Template.thumbnails.events({
	'click .image': function () {
		Session.set('gallerySelection', this);
	}
});

var setSizes = function () {
	Session.set('thumbSize', $(window).width() >= 1200 ? 110:90);

	var vh = parseInt($(window).height() * 0.7);
	Session.set('galleryH', vh);
};

Meteor.startup(function () {
	setSizes();
	$(window).on('resize', setSizes);
});

// http://img.youtube.com/vi/4q8_OZfIp9Y/hqdefault.jpg