Template.layout.events({
	'click a': function (evt) {
		var a = $(evt.target);
		if (!a.is('a')) {
			a = a.parents('a').first();
		}
		var dst = a.prop('href');
		if (dst.indexOf('http') !== -1 && dst.indexOf(window.location.host) === -1) {
			evt.preventDefault();
			window.open(dst);
		}
	}
});