Router.configure({
	layoutTemplate: 'layout',
	notFoundTemplate: 'notFound',
	loadingTemplate: 'loading',
	yieldTemplates: {
		categoryNav: {to: 'nav'},
		footer: {to: 'footer'}
	}, waitOn: function () {
		return [Meteor.subscribe('app-props'), Meteor.subscribe('posts'), Meteor.subscribe('categories')];
	},
	fastRender: true
});

Router.map(function () {
	this.route('category', {
		path: '/category/:_id',
		template: 'page',
		data: function () {
			GAnalytics.pageview();
			return {
				category: CategoryCollection.findOne(this.params._id),
				posts: PostCollection.find({parent: this.params._id})
			};
		}
	});
	this.route('post', {
		path: '/post/:_id',
		template: 'postAlone',
		data: function () {
			GAnalytics.pageview();
			return {
				category: CategoryCollection.findOne(this.params._id),
				post: PostCollection.findOne(this.params._id)
			};
		}
	});
	this.route('gallery', {
		path: '/gallery/:_id',
		template: 'gallery',
		data: function () {
			GAnalytics.pageview();
			return {
				category: CategoryCollection.findOne(this.params._id),
				post: PostCollection.findOne(this.params._id)
			};
		}
	});
	this.route('home', {
		path: '/',
		template: 'page',
		
		action: function () {
			var fc = CategoryCollection.findOne();
			this.redirect('category', fc);
		}
	});
});