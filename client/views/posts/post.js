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
		hint: 'The heavier the element, the later it will appear',
		default: 100
	}
};
var GALLERY_FIELDS = {
	title: {
		default: fixie.fetchPhrase
	},
	username: {
		type: 'text',
		label: 'Google+ username',
		hint: '(eg. write: johndoe if your gmail address is johndoe@gmail.com)',
		default: 'albertmatyi'
	},
	albumId: {
		type: 'text',
		label: 'Google+ album ID',
		hint: 'When you view an album, this the number that comes after "albums" in the url. Ex: https://plus.google.com/u/0/photos/110836571215849032642/albums/5940476182069855361',
		default: '5940476182069855361'
	},
	weight: {
		post: function (val) { return parseInt(val); },
		hint: 'The heavier the element, the later it will appear',
		default: 100
	}
};

var editPost = function (category, post, postType, fields) {
	var editor = new Editor({
		'fields': i18n.editorFieldsDef(fields, ['title', 'description']),
		'data': i18n.editorPrepData(post, ['title', 'description']),
		'save': function (obj) {
			obj = i18n.editorProcessData(obj);

			if (post._id) {
				PostCollection.update(post._id, {$set: _.pick(obj, _.keys(fields))});
			} else {
				PostCollection.insert(
					_.extend({parent: category._id, type: postType},
						_.pick(obj, _.keys(fields))
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

Template.postEntry.helpers({
	typeIs: function (type) {
		return this.type === type;
	}
});

Template.postControls.events({
	'click .delete.btn': function () {
		if(confirm('Are you sure?')) {
			PostCollection.remove(this._id);
		}
	},
	'click .edit.btn': function () {
		if (this.type === 'gallery') {
			editPost({}, this, 'gallery', GALLERY_FIELDS);
		} else {
			editPost({}, this, 'post', POST_FIELDS);
		}
	}
});
Template.postAdd.helpers(_.extend({}, i18n.templateHelperFor('title')));

Template.postAdd.events({
	'click .add.btn': function () {
		if (this.type === 'gallery') {
			editPost(this, {}, 'gallery', GALLERY_FIELDS);
		} else {
			editPost(this, {}, 'post', POST_FIELDS);
		}
	}
});