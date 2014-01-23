var getterFor = function (name) {
	return function () {
		if (this[name]) {
			return this[name][i18n.language()];
		} else {
			console.warn('No i18n data for ' + name + ' in:');
			console.warn(this);
			return '#ERR';
		}
	};
};

i18n = {
	templateHelperFor: function () {
		var obj = {};
		for (var i = arguments.length - 1; i >= 0; i--) {
			obj[arguments[i]] = getterFor(arguments[i]);
		}
		return obj;
	},
	languages: function () {
		return AppCollection.findOne({key: 'languages'}).value;
	},
	language: function () {
		return Session.get('language') || 'en';
	},
	editorFieldsDef: function (editorFields, fields) {
		var res = {};
		var langs = i18n.languages();
		_.each(editorFields, function (val, key) {
			if (_.contains(fields, key)) {
				for (var i = langs.length - 1; i >= 0; i--) {
					var lang = langs[i];
					res[key + '-' + lang + '-'] = val;
				}
			} else {
				res[key] = val;
			}
		});
		return res;
	},
	editorPrepData: function (data, fields) {
		var res = {};
		var langs = i18n.languages();
		_.each(data, function (val, key) {
			if (_.contains(fields, key)) {
				for (var i = langs.length - 1; i >= 0; i--) {
					var lang = langs[i];
					res[key + '-' + lang + '-'] = val[lang];
				}
			} else {
				res[key] = val;
			}
		});
		return res;
	},
	editorProcessData: function (data) {
		var res = {};
		var rexp = /^(.*)-(\w{2,3})-$/;
		_.each(data, function (val, key) {
			var match = rexp.exec(key);
			if (match) {
				key = match[1];
				var lang = match[2];
				res[key] = res[key] || {};
				res[key][lang] = val;
			} else {
				res[key] = val;
			}
		});
		return res;
	}
};