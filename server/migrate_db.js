var toV1 = function () {
	console.log('Updating post types.');
	PostCollection.update({type: {$exists: false}}, {$set: {type: 'post'}}, {multi: true});
	AppCollection.insert({_key: 'dbVersion', value: 1});
};


Meteor.startup(function () {
	var dbVer = AppCollection.findOne({_key: 'dbVersion'});
	if (!dbVer) {
		toV1();
	} else {
		console.log(' No migration.');
	}
});