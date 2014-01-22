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
	language: function () {
		return Session.get('language') || 'en';
	}
};