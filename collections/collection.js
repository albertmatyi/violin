CategoryCollection = new Meteor.Collection('categories');
PostCollection = new Meteor.Collection('posts');
AppCollection = new Meteor.Collection('app-props');

if (Meteor.isServer) {
	Meteor.publish('posts', function () {
		return PostCollection.find();
	});
	Meteor.publish('categories', function () {
		return CategoryCollection.find();
	});
	Meteor.publish('app-props', function () {
		return AppCollection.find();
	});
}

if (Meteor.isClient) {
	Meteor.subscribe('posts');
	Meteor.subscribe('categories');
	Meteor.subscribe('app-props');	
}