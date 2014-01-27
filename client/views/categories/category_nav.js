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

var layoutMenu = function () {
	var $lis = $('.navbar-nav > li');
	if ($(window).width() < 992) {
		$lis.css({width: ''});
		return;
	}
	var $placeholder = $('.navbar-nav > li.logo-placeholder');
	var separatorIdx = $placeholder.index();
	var w1=0;
	var $els1 = _.map($lis.slice(0, separatorIdx), function (e) {
		var $e = $(e);
		w1 += $e.outerWidth();
		return $e;
	});
	var w2=0;
	var $els2 = _.map($lis.slice(separatorIdx+1), function (e) {
		var $e = $(e);
		w2 += $e.outerWidth();
		return $e;
	});
	var ulW = $('.navbar-nav').width();
	var phW = Math.max(260, Math.min(320, ulW - (w1 + w2)));
	var sideW = (ulW - phW) / 2 - 1;
	_.each($els1, function ($e) {
		$e.css({width: sideW * $e.width()/w1 + 'px'});
	});
	$placeholder.css({width: phW + 'px'});
	_.each($els2, function ($e) {
		$e.css({width: sideW * $e.width()/w2 + 'px'});
	});
};

$(window).on('resize', layoutMenu);

Template.categoryNav.rendered = function () {
	layoutMenu();
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

Template.adminNavControls.events({
	'click .edit.btn': function (evt) {
		evt.preventDefault();
		evt.stopImmediatePropagation();
		Category.editCategory(this);
	},
	'click .add.btn': function (evt) {
		evt.preventDefault();
		evt.stopImmediatePropagation();
		Category.editCategory({parent: this._id});
	},
	'click .delete.btn': function (evt) {
		evt.preventDefault();
		evt.stopImmediatePropagation();
		if (confirm('Are you sure?')) {
			Category.deleteCategory(this._id);
		}
	}
});