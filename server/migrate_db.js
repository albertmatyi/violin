var toV1 = function () {
	console.log('Updating post types.');
	PostCollection.update({type: {$exists: false}}, {$set: {type: 'post'}}, {multi: true});
	PostCollection.update({type: 'gallery'}, {$set: {type: 'photoGallery'}}, {multi: true});
	AppCollection.insert({_key: 'dbVersion', value: 1});
};

var toV2 = function () {
	console.log('Adding interval timeout prop.');
	AppCollection.insert({key: 'sliderInterval', value: 3000, description: 'The time in ms between two slides'});
	AppCollection.update({_key: 'dbVersion'}, {$set: {value: 2}}, {multi: true});
};


Meteor.startup(function () {
	var dbVer = AppCollection.findOne({_key: 'dbVersion'});
	if (!dbVer) {
		toV1();
	} else if (dbVer.value === 1) {
		toV2();
	} else {
		console.log(' No migration.');
	}
});