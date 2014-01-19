var categories = function () {
	return CategoryCollection.find({'parent': this._id});
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
Template.categoryNavDropdown.helpers({
	'categories': categories,
	'active': isActive
});
Template.categoryLink.helpers({
	'active': isActive
});

Template.categoryNavDropdown.events({
	'click .dropdown > a': function (e) {
		e.preventDefault();
	}
});