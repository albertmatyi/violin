Template.header.categories = function () {
	return CategoryModel.find();
};

Router.configure({
  autoRender: false
});

Router.map(function () {
  this.route('contents', {
    'path': '/contents/:id',
    'template': 'contents',
    waitOn: function () {
      return Meteor.subscribe('content');
    },

    data: function () {
      return {
      	'contents': ContentModel.find({category: this.params.id})
      };
    }
  });
});	

Deps.autorun(function () {
	var match = (/[^\/]+$/).exec(window.location);
	if (match) {
		catId = match[1];
	} else {
		catId = CategoryModel.findOne({'title': 'Home'});
		catId = catId ? catId._id:catId;
	}
	Session.set('categoryId', catId);
});