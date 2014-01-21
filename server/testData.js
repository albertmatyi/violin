
var createPost = function (parent) {
	PostCollection.insert({'title': fixie.fetchPhrase(), 'description': fixie.fetchParagraph(), 'parent': parent, 'image': 'http://lorempixel.com/400/200/?s=' + Math.random()});
};

var createCategory = function (title, parent) {
	var catId = CategoryCollection.insert({'title': title, parent: parent});
	var n = Math.random() * 5 + 3;
	while (n-- > 0) {
		createPost(catId);
	}
	return catId;
};

fillWithData = function () {
	CategoryCollection.remove({});
	PostCollection.remove({});

	var catId = createCategory('Home');
	createCategory('Intro Video', catId);
	createCategory('News blocks', catId);
	catId = createCategory('The competition');
	createCategory('About ', catId);
	createCategory('Regulations', catId);
	createCategory('Schedule/Program', catId);
	createCategory('Jury', catId);
	createCategory('Prizes', catId);
	createCategory('Honors Committee', catId);
	createCategory('Complementary Music Programme', catId);
	createCategory('Artists', catId);
	createCategory('Competitors', catId);
	createCategory('Partners', catId);
	createCategory('Register', catId);
	catId = createCategory('The City');
	createCategory('About', catId);
	createCategory('How to get there', catId);
	createCategory('Accomodation', catId);
	createCategory('Eat&drink', catId);
	catId = createCategory('Media');
	catId = createCategory('Support Us');
	createCategory('Become a sponsor - 2', catId);
	createCategory('Join us - 2', catId);
	createCategory('As an individual', catId);
	createCategory('The organisation', catId);
	catId = createCategory('Contact');
};

