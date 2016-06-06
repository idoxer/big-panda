
import browserSync from "browser-sync";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackConfig from "../webpack.config";
import conf from "../config.json";

import Task from "./task";

const config = webpackConfig({debug: true});
var compiler = webpack(config);
var server = null;
var watch = false;

Task.clean();
Task.exportPublic();
Task.build(true, onSourceChanged).then(() =>
{
	server = Task.serve();
	watch = true;

	browserSync(
	{
		proxy:
		{
			target: "localhost:" + conf.port,

			middleware:
			[
				webpackDevMiddleware(compiler,
				{
					publicPath: "/",
					stats: config.stats
				}),
				webpackHotMiddleware(compiler)
			]
		},

		files:
		[
			"build/public/*.css"
		]
	});
});

function onSourceChanged(file)
{
	console.log("onSourceChanged", file);

	// Server files changed, restart
	if (watch && file == "server")
	{
		server.kill("SIGTERM");
		server = Task.serve();
	}
}
