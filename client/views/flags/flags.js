Template.flags.helpers({
	flags: function () {
		return [{ icon: 'play', type: 'live', text: 'live'},
		{ icon: 'facebook-square', type: 'facebook'},
		{ icon: 'google-plus', type: 'google-plus'},
		{ icon: 'twitter-square', type: 'twitter'},
		{ icon: 'tumblr-square', type: 'tumblr'},
		{ icon: 'youtube-square', type: 'youtube'}];
	}
});

Template.flag.helpers({
	address: function () {
		return Meteor.getConfigValue('social.address.' + this.type);
	}
});