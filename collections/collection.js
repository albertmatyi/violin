CategoryCollection = new Meteor.Collection('categories');
PostCollection = new Meteor.Collection('posts');
AppCollection = new Meteor.Collection('app-props');

if (Meteor.isServer) {
	Meteor.publish('posts', function () {
		return PostCollection.find({}, {sort: {weight: 1}});
	});
	Meteor.publish('categories', function () {
		return CategoryCollection.find({}, {sort: {weight: 1}});
	});
	Meteor.publish('app-props', function () {
		return AppCollection.find({}, {sort: {key: 1}});
	});
	var timestampIt = {
		'insert': function () {
			this.updated = + new Date();
			return false;
		}
	};

	var allowAdmin = function () { return true; };

	CategoryCollection.deny(timestampIt);
	PostCollection.deny(timestampIt);
	AppCollection.allow({
		insert: allowAdmin,
		remove: allowAdmin,
		update: allowAdmin
	});
	PostCollection.allow({
		insert: allowAdmin,
		remove: allowAdmin,
		update: allowAdmin
	});
	CategoryCollection.allow({
		insert: allowAdmin,
		remove: allowAdmin,
		update: allowAdmin
	});
}