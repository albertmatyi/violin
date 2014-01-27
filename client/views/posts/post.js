var enrichText = function (s) {
	s = s.replace(/\n\n/gi, '</p><p>');
	s = s.replace(/\n/gi, '<br/>');
	return '<p>' + s + '</p>';
}

Template.postSummary.helpers(_.extend({
	'descriptionSummary': function () {
		return this.description[i18n.language()].substr(0, 110);
	}
}, i18n.templateHelperFor('title', 'description')));
Template.post.helpers(_.extend({}, 
	i18n.templateHelperFor(
		'title', 
		{'description': enrichText 
	})));


var POST_FIELDS = {
	title: {
		default: fixie.fetchPhrase
	},
	image: {
		type: 'text',
		label: 'Image URL',
		default: fixie.fetchImageURL
	},
	'description': {
		type: 'textarea',
		default: fixie.fetchParagraph
	},
	weight: {
		post: function (val) { return parseInt(val); },
		hint: 'The heavier the element, the later it will appear'
	}
};
Template.postControls.events({
	'click .delete.btn': function () {
		if(confirm('Are you sure?')) {
			PostCollection.remove(this._id);
		}
	},
	'click .edit.btn': function () {
		var self = this;
		var editor = new Editor({
			'fields': i18n.editorFieldsDef(POST_FIELDS, ['title', 'description']),
			'data': i18n.editorPrepData(this, ['title', 'description']),
			'save': function (obj) {
				obj = i18n.editorProcessData(obj);
				PostCollection.update(self._id, {$set: _.pick(obj, _.keys(POST_FIELDS))});
			}
		});
		editor.show();
	}
});
Template.postAdd.helpers(_.extend({}, i18n.templateHelperFor('title')));
Template.postAdd.events({
	'click .add.btn': function () {
		var self = this;
		var editor = new Editor({
			'fields': i18n.editorFieldsDef(POST_FIELDS, ['title', 'description']),
			'data': i18n.editorPrepData({}, ['title', 'description']),
			'save': function (obj) {
				obj = i18n.editorProcessData(obj);
				PostCollection.insert(
					_.extend({parent: self._id},
						_.pick(obj, _.keys(POST_FIELDS))
						));
			}
		});
		editor.show();
	}
});