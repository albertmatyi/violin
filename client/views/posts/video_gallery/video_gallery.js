VIDEO_GALLERY_FIELDS = {
	title: {
		'default': fixie.fetchPhrase
	},
	videoId: {
		type: 'text',
		label: 'Youtube video id',
		hint: '(eg. write: IJtq5l8DfdE if the youtube video url is http://www.youtube.com/watch?v=IJtq5l8DfdE)',
		'default': 'IJtq5l8DfdE'
	},
	weight: {
		post: function (val) { return parseInt(val, 10); },
		hint: 'The heavier the element, the later it will appear',
		'default': 100
	}
};

Template.videoGalleryListItem.helpers(_.extend({}, i18n.templateHelperFor('title')));

Template.videoGalleryListItem.events({
	'click .youtube-cover': function () {
		var $player = $(Template.youtubePlayer(this));
		$('body').append($player);
		$player.on('click', function () {
			$player.remove();
		});
	}
});
