Template.postSummary.helpers(_.extend({
	'descriptionSummary': function () {
		return this.description[i18n.language()].substr(0, 110);
	}
}, i18n.templateHelperFor('title', 'description')));
Template.post.helpers(_.extend({
}, i18n.templateHelperFor('title', 'description')));