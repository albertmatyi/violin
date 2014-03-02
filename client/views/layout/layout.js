Template.layout.events({
	'click a': function (evt) {
		var dst = $(evt.target).prop('href');
		if (dst.indexOf('http') !== -1 && dst.indexOf(window.location.host) === -1) {
			evt.preventDefault();
			window.open(dst);
		}
	}
});