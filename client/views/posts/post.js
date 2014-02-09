var POST_FIELDS = {
	title: {
		default: fixie.fetchPhrase
	},
	image: {
		type: 'text',
		label: 'Image URL',
		default: fixie.fetchImageURL
	},
	disableBorder: {
		type: 'checkbox',
		label: 'Disable border',
		default: false
	},
	'description': {
		type: 'textarea',
		default: fixie.fetchParagraph
	},
	weight: {
		post: function (val) { return parseInt(val); },
		hint: 'The heavier the element, the later it will appear',
		default: 100
	}
};

var FIELDS = {
	post: POST_FIELDS,
	photoGallery: PHOTO_GALLERY_FIELDS,
	videoGallery: VIDEO_GALLERY_FIELDS,
	home: SLIDER_FIELDS
};

var editPost = function (category, post, postType) {
	var editor = new Editor({
		'fields': i18n.editorFieldsDef(FIELDS[postType], ['title', 'description']),
		'data': i18n.editorPrepData(post, ['title', 'description']),
		'save': function (obj) {
			obj = i18n.editorProcessData(obj);

			if (post._id) {
				PostCollection.update(post._id, {$set: _.pick(obj, _.keys(FIELDS[postType]))});
			} else {
				PostCollection.insert(
					_.extend({parent: category._id, type: postType},
						_.pick(obj, _.keys(FIELDS[postType]))
						));
			}
		}
	});
	editor.show();
};


Template.postSummary.helpers(_.extend({
	'descriptionSummary': function () {
		return this.description[i18n.language()].substr(0, 110);
	}
}, i18n.templateHelperFor('title', 'description')));

Template.post.helpers(_.extend({},
	i18n.templateHelperFor('title', 'description')));

Template.postControls.events({
	'click .delete.btn': function () {
		if(confirm('Are you sure?')) {
			PostCollection.remove(this._id);
		}
	},
	'click .edit.btn': function () {
		editPost({}, this, this.type);
	}
});

Template.postAdd.helpers(_.extend({}, i18n.templateHelperFor('title')));

Template.postAdd.events({
	'click .add.btn': function () {
		editPost(this, {}, this.type);
	}
});