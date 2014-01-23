var languify = function (str) {
	var langs = AppCollection.findOne({key: 'languages'}).value;
	var obj = {};
	for (var i = langs.length - 1; i >= 0; i--) {
		obj[langs[i]] = str + langs[i];
	}
	return obj;
};
var createPost = function (parent, image) {
	var imgURL = image ? 'http://lorempixel.com/400/200/?s=' + Math.random():undefined;
	PostCollection.insert({'title': languify(fixie.fetchPhrase()), 'description': languify(fixie.fetchParagraph()), 'parent': parent, 'image': imgURL});
};

var createCategory = function (title, parent, hasDropdown, type) {
	var catId = CategoryCollection.insert({'title': languify(title), parent: parent, hasDropdown:hasDropdown, type: type});
	var n = Math.floor(Math.random() * 5 + 3);
	while (n-- > 0) {
		createPost(catId, n !== 4);
	}
	return catId;
};

var fillWithData = function () {
	AppCollection.insert({key: 'languages', value: ['en','hu','ro']});

	var catL0, catL1, catL2;
	catL0 = createCategory('Home', undefined, false, 'home');
	catL1 = createCategory('Intro Video', catL0);
	catL1 = createCategory('News blocks', catL0);

	catL0 = createCategory('The competition', undefined, true);
	catL1 = createCategory('About ', catL0);
	catL2 = createCategory('Presentation', catL1);
	catL2 = createCategory('Organizers', catL1);
	catL1 = createCategory('Regulations', catL0);
	catL1 = createCategory('Schedule/Program', catL0);
	catL2 = createCategory('Official competition program', catL1);
	catL2 = createCategory('Complementary Music Program', catL1);
	catL1 = createCategory('Jury', catL0);
	catL1 = createCategory('Prizes', catL0);
	catL1 = createCategory('Honors Committee', catL0);
	catL1 = createCategory('Artists', catL0);
	catL2 = createCategory('Orchestra', catL1);
	catL2 = createCategory('Conductor', catL1);
	catL2 = createCategory('Piano accompanists', catL1);
	catL2 = createCategory('Composers', catL1);
	catL1 = createCategory('Competitors', catL0);
	catL1 = createCategory('Partners', catL0);
	catL1 = createCategory('Register', catL0);
	
	catL0 = createCategory('The City', undefined, true);
	catL1 = createCategory('About', catL0);
	catL1 = createCategory('How to get there', catL0);
	catL1 = createCategory('Accomodation', catL0);
	catL1 = createCategory('Eat&drink', catL0);
	
	catL0 = createCategory('Media', undefined, false, 'media');
	catL1 = createCategory('Daily galleries ', catL0);
	catL1 = createCategory('Digital concert hall', catL0);
	
	catL0 = createCategory('Support Us', undefined, true);
	catL1 = createCategory('Become a sponsor', catL0);
	catL1 = createCategory('Join us', catL0);

	catL0 = createCategory('Contact');
};

if (CategoryCollection.find().count() === 0) {
	fillWithData();
}