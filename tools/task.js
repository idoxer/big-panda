
import fs from "fs-extra";
import cp from "child_process";
import path from "path";
import webpack from "webpack";
import webpackConfig from "../webpack.config";

class Task
{
	static clean()
	{
		console.log("Cleaning ..");

		fs.removeSync("build/*");

		if (!fs.existsSync("build"))
			fs.mkdirSync("build");

		if (!fs.existsSync("build/public"))
			fs.mkdirSync("build/public");
	}

	static exportPublic()
	{
		fs.copySync("src/public", "build/public");
	}

	static build(watch, onSourceChanged)
	{
		return new Promise((resolve, reject) =>
		{
			console.log("Building ..");

			let bundleState = 0;

			const compiler = webpack(
				[
					webpackConfig({minimize: !watch, autoprefixer: !watch, debug: watch}),
					webpackConfig({minimize: !watch, server: true, debug: watch})
				]);

			function bundle(error, stats)
			{
				if (error)
					return reject(error);

				if (watch && stats)
				{
					const config = stats.toJson();
					const file = Object.keys(config.assetsByChunkName)[0];
					onSourceChanged && onSourceChanged(file);
				}

				console.log(stats.toString(webpackConfig({debug: true}).stats));

				if (++bundleState == 2)
					resolve();
			}

			if (watch)
				compiler.watch({ aggregateTimeout: 150 }, bundle);
			else
				compiler.run(bundle);
		});
	}

	static serve()
	{
		const env =
		{
			env: Object.assign({ NODE_ENV: "development" }, process.env),
			silent: false
		};

		const server = cp.fork(path.join(__dirname, "../build/server.js"), env);

		process.on("exit", () => server.kill("SIGTERM"));
		return server;
	}
}

export default Task;
