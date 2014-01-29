
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});

Handlebars.registerHelper('renderAdmin', function () {
	return window.location.hash.indexOf('admin') !== -1 || Meteor.userId;
});

Template.auth.helpers({
	showLogin: function () {
		return window.location.hash.indexOf('admin') !== -1 || Meteor.userId;
	}
});
