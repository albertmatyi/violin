Router.configure({
	'layoutTemplate': 'layout',
	'notFoundTemplate': 'notFound',
	'loadingTemplate': 'loading',
	'yieldTemplates': {
		'categoryNav': {to: 'nav'},
		'footer': {to: 'footer'}
	},
});

Router.map(function () {
	this.route('category', {
		'path': '/category/:_id',
		'template': 'page',
		waitOn: function () {
			return [Meteor.subscribe('posts'), Meteor.subscribe('categories')];
		},
		'data': function () {
			return {
				'category': CategoryCollection.findOne(this.params._id),
				'posts': PostCollection.find({parent: this.params._id})
			};
		}
	});
	this.route('home', {
		'path': '/',
		'template': 'page',
		waitOn: function () {
			return [Meteor.subscribe('categories')];
		},
		'data': function () {
			var fc = CategoryCollection.findOne();
			Router.go('category', fc);
		}
	});
});