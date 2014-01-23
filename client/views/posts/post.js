Template.postSummary.helpers(_.extend({
	'descriptionSummary': function () {
		return this.description[i18n.language()].substr(0, 110);
	}
}, i18n.templateHelperFor('title', 'description')));
Template.post.helpers(_.extend({
}, i18n.templateHelperFor('title', 'description')));

Template.postControls.events({
	'click .delete.btn': function () {
		if(confirm('Are you sure?')) {
			PostCollection.remove(this._id);
		}
	}, 
	'click .edit.btn': function () {
		CATEGORY_FIELDS = {
			title: 0,
			image: {
				type: 'text',
				label: 'Image URL'
			},
			'description': {
				'type': 'textarea'
			}
		};
		var self = this;
		var editor = new Editor({
			'fields': i18n.editorFieldsDef(CATEGORY_FIELDS, ['title', 'description']),
			'data': i18n.editorPrepData(this, ['title', 'description']),
			'save': function (obj) {
				obj = i18n.editorProcessData(obj);
				PostCollection.update(self._id, {$set: _.pick(obj, _.keys(CATEGORY_FIELDS))});
			}
		});
		editor.show();
	}
});