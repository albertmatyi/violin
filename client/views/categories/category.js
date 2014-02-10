Category = {};

var CATEGORY_FIELDS = {
	title: 0,
	hasDropdown: {
		type: 'checkbox',
		label: 'Has dropdown',
		'default': true
	},
	type: {
		type: 'select',
		options: {
			'default': 'default',
			home: 'home',
			photoGallery: 'photoGallery',
			videoGallery: 'videoGallery'
		}
	},
	weight: {
		type: 'text',
		'default': 100,
		post: function (val) { return parseInt(val, 10); },
		hint: 'The heavier the element, the later it will appear'
	}
};


Category.editCategory = function (cat) {
	var data = i18n.editorPrepData(cat, ['title']);
	var editor = new Editor({
		'fields': i18n.editorFieldsDef(CATEGORY_FIELDS, ['title']),
		'data': data,
		'save': function (obj) {
			obj = i18n.editorProcessData(obj);
			obj = _.pick(obj, _.keys(CATEGORY_FIELDS));
			if (cat._id) {
				CategoryCollection.update(cat._id, {
					$set: _.extend({parent: cat.parent}, obj)
				});
			} else {
				CategoryCollection.insert(_.extend({parent: cat.parent}, obj));
			}
		}
	});
	editor.show();
};

Category.deleteCategory = function (id) {
	CategoryCollection.find({parent: id}).forEach(function (cat) {
		Category.deleteCategory(cat._id);
	});
	PostCollection.find({parent: id}).forEach(function (post) {
		PostCollection.remove(post._id);
	});
	CategoryCollection.remove(id);
};