Template.flags.helpers({
	flags: function () {
		return [{ icon: 'play', type: 'live', text: 'live'},
		{ icon: 'facebook', type: 'facebook'},
		{ icon: 'google-plus', type: 'google-plus'},
		{ icon: 'twitter', type: 'twitter'},
		{ icon: 'tumblr', type: 'tumblr'},
		{ icon: 'youtube', type: 'youtube'}];
	}
});

Template.flag.helpers({
	address: function () {
		return Meteor.getConfigValue('social.address.' + this.type);
	}
});