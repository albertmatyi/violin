Template.sections.helpers(_.extend({
	categories: function () {
		return CategoryCollection.find({parent: this._id});
	},
	posts: function () {
		return { posts: PostCollection.find({parent: this._id})};	
	}
}, i18n.templateHelperFor('title')));