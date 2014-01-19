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
		'template': 'posts',
		waitOn: function () {
			return [Meteor.subscribe('posts'), Meteor.subscribe('categories')];
		},
		'data': function () {
			return {
				'posts': PostCollection.find({parent: this.params._id})
			};
		}
	});
	this.route('home', {
		'path': '/',
		'template': 'posts',
		'data': function () {
			return {
				// CategoryCollection.findOne()._id
				'posts': PostCollection.find({parent: undefined})
			};
		}
	});
});