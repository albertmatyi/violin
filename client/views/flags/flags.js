Template.flags.helpers({
	flags: function () {
		return [{ icon: 'play', type: 'live', text: 'live'},
		{ icon: 'facebook-square', type: 'facebook'},
		{ icon: 'tumblr-square', type: 'tumblr'},
		{ icon: 'youtube-square', type: 'youtube'},
		{ icon: 'twitter-square', type: 'twitter'}];
	}
});

Template.flag.helpers({
	address: function () {
		return Meteor.getConfigValue('social.address.' + this.type);
	}
});