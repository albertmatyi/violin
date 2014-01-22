Template.post.helpers(_.extend({
	'descriptionSummary': function () {
		return this.description[i18n.language()].split(' ').splice(0,20).join(' ');
	}
}, i18n.templateHelperFor('title', 'description')));