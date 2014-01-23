Meteor.methods({
	fixture: function () {
		AppCollection.remove({});
		CategoryCollection.remove({});
		PostCollection.remove({});
		fillWithData();
	}
});