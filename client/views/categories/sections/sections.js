Template.sections.helpers({
	categories: function () {
		return CategoryCollection.find({parent: this._id});
	},
	posts: function () {
		return { posts: PostCollection.find({parent: this._id})};
	},
	summary: function () {
		return CategoryCollection.findOne(this.parent).type === 'home';
	}
});