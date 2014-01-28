Template.sections.helpers(_.extend({
	categories: function () {
		return CategoryCollection.find({parent: this._id});
	},
	posts: function () {
		return { posts: PostCollection.find({parent: this._id})};	
	}, 
	summary: function () {
		return CategoryCollection.findOne(this.parent).type === 'home';
	}
}, i18n.templateHelperFor('title')));

Template.sections.events({
	'click .title .edit.btn': function (evt) {
		evt.preventDefault();
		evt.stopImmediatePropagation();
		Category.editCategory(this);
	},
	'click .title .delete.btn': function (evt) {
		evt.preventDefault();
		evt.stopImmediatePropagation();
		if (confirm('Are you sure?')) {
			Category.deleteCategory(this._id);
		}
	}
});