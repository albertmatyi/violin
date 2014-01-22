var categories = function () {
	var cats = CategoryCollection.find({'parent': this._id});
	if (!this._id) {
		cats = cats.fetch();
		cats.splice(cats.length / 2, 0, {
			'placeholder': true
		});
	}
	return cats;
};

var isActive = function () {
	var active = window.location.href.indexOf(this._id) !== -1;
	active = active || !_.every(CategoryCollection.find({parent: this._id}).fetch(), function (category) {
		return window.location.href.indexOf(category._id) === -1;
	});
	return active;
};

Template.categoryNav.helpers({
	'categories': categories,
});
Template.categoryNavDropdown.helpers(_.extend({
	'categories': categories,
	'active': isActive
}, i18n.templateHelperFor('title')));
Template.categoryLink.helpers(_.extend({
	'active': isActive
}, i18n.templateHelperFor('title')));

Template.categoryNavDropdown.events({
	'click .dropdown > a': function (e) {
		e.preventDefault();
	}
});	