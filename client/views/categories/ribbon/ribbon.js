Template.ribbonTitle.helpers(_.extend({}, i18n.templateHelperFor('title')));

Template.ribbonTitle.events({
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