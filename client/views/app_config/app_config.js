Template.appConfigButton.events({
	'click .app-config.btn': function () {
		var props = AppCollection.find().fetch();
		var fields = {};
		var data = {};
		_.each(props, function (val) {
			fields[val.key] = {
				post: function (v) {
					try {
						return JSON.parse(v);
					} catch (e) {
						alert('Invalid value: ' + v);
						throw e;
					}
				},
				_id: val._id
			};
			data[val.key] = JSON.stringify(val.value);
		});
		var editor = new Editor({
			fields: fields,
			data: data,
			save: function (obj) {
				_.each(obj, function (val, key) {
					AppCollection.update(
						fields[key]._id, {
							$set: {value: val}
						});
				});
			}
		});

		editor.show();
	}
});

Meteor.getConfigValue = function (key) {
	var prop = AppCollection.findOne({key: key});
	if (!prop) {
		AppCollection.insert({key:key, value:key});
		return key;
	}
	return prop.value;
};