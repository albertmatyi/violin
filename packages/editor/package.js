Package.describe({
	summary: "A flexible editor panel for your data"
});

Package.on_use(function (api, where) {
	api.use(['less'], 'client');
	api.use(['templating'], 'client');

	api.add_files(['editor.html', 'editor.js', 'editor.less'], 'client');

	if (api.export) {
		api.export('Editor');
	}
});