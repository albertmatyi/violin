Handlebars.registerHelper('i18n', function (key) {
	key = key + '.' + i18n.language();
	var val = AppCollection.findOne({key: key});
	if (!val) {
		val = {key: key, value: key};
		AppCollection.insert(val);
	}
	return val.value;
});
Template.languageBar.helpers({
	languages: function () {
		var langs = AppCollection.findOne({key: 'languages'});
		return _.map(langs.value, function(e) {
			return {language: e};
		});
	}
});

Template.languageBar.events({
	'click .language-bar a': function (e) {
		e.preventDefault();
		Session.set('language', this.language);
	}
});

var getterFor = function (key, fn) {
	return function () {
		if (this[key]) {
			return fn(this[key][i18n.language()]);
		} else {
			console.warn('No i18n data for ' + key + ' in:');
			console.warn(this);
			return '#ERR';
		}
	};
};

var identityF = function (v) { return v; };

i18n = {
	templateHelperFor: function () {
		var obj = {};
		for (var i = arguments.length - 1; i >= 0; i--) {
			var key, fn;
			if (!_.isString(arguments[i])) {
				var ps = _.pairs(arguments[i])[0];
				key = ps[0];
				fn = ps[1];
			} else {
				key = arguments[i];
				fn = identityF;
			}
			obj[key] = getterFor(key, fn);
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