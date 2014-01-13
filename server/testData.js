fillWithData = function () {
	CategoryModel.remove({});
	ContentModel.remove({});

	var imgUrl = '/pix/violin.jpg';

	var catId = CategoryModel.insert({'title': 'Home'});
	ContentModel.insert({'title': 'Intro Video - 1', 'description': fixie.fetchParagraph(), 'category': catId, 'image': imgUrl});
	ContentModel.insert({'title': 'News blocks - n', 'description': fixie.fetchParagraph(), 'category': catId, 'image': imgUrl});
	catId = CategoryModel.insert({'title': 'The competition'});
	ContentModel.insert({'title': 'About  - 1', 'description': fixie.fetchParagraph(), 'category': catId, 'image': imgUrl});
	ContentModel.insert({'title': 'Regulations', 'description': fixie.fetchParagraph(), 'category': catId, 'image': imgUrl});
	ContentModel.insert({'title': 'Schedule/Program - n', 'description': fixie.fetchParagraph(), 'category': catId, 'image': imgUrl});
	ContentModel.insert({'title': 'Jury - n', 'description': fixie.fetchParagraph(), 'category': catId, 'image': imgUrl});
	ContentModel.insert({'title': 'Prizes', 'description': fixie.fetchParagraph(), 'category': catId, 'image': imgUrl});
	ContentModel.insert({'title': 'Honors Committee', 'description': fixie.fetchParagraph(), 'category': catId, 'image': imgUrl});
	ContentModel.insert({'title': 'Complementary Music Programme', 'description': fixie.fetchParagraph(), 'category': catId, 'image': imgUrl});
	ContentModel.insert({'title': 'Organisers- n', 'description': fixie.fetchParagraph(), 'category': catId, 'image': imgUrl});
	ContentModel.insert({'title': 'Artists - n', 'description': fixie.fetchParagraph(), 'category': catId, 'image': imgUrl});
	ContentModel.insert({'title': 'Competitors', 'description': fixie.fetchParagraph(), 'category': catId, 'image': imgUrl});
	ContentModel.insert({'title': 'Partners - n', 'description': fixie.fetchParagraph(), 'category': catId, 'image': imgUrl});
	catId = CategoryModel.insert({'title': 'Register'});
	catId = CategoryModel.insert({'title': 'The City'});
	ContentModel.insert({'title': 'About', 'description': fixie.fetchParagraph(), 'category': catId, 'image': imgUrl});
	ContentModel.insert({'title': 'How to get there', 'description': fixie.fetchParagraph(), 'category': catId, 'image': imgUrl});
	ContentModel.insert({'title': 'Accomodation', 'description': fixie.fetchParagraph(), 'category': catId, 'image': imgUrl});
	ContentModel.insert({'title': 'Eat&drink', 'description': fixie.fetchParagraph(), 'category': catId, 'image': imgUrl});
	catId = CategoryModel.insert({'title': 'Media'});
	catId = CategoryModel.insert({'title': 'Gallery'});
	catId = CategoryModel.insert({'title': 'Support Us'});
	ContentModel.insert({'title': 'Become a sponsor - 2', 'description': fixie.fetchParagraph(), 'category': catId, 'image': imgUrl});

	ContentModel.insert({'title': 'Join us - 2', 'description': fixie.fetchParagraph(), 'category': catId, 'image': imgUrl});
	ContentModel.insert({'title': 'As an individual', 'description': fixie.fetchParagraph(), 'category': catId, 'image': imgUrl});
	ContentModel.insert({'title': 'The organisation', 'description': fixie.fetchParagraph(), 'category': catId, 'image': imgUrl});
	catId = CategoryModel.insert({'title': 'Contact'});
};