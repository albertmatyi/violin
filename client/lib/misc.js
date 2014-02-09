Handlebars.registerHelper('typeIs', function (type) {
	if (arguments.length === 2) {
		return this.type === type;
	} else {
		return arguments[0].type === arguments[1];
	}
});