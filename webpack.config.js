
import fs from "fs";
import path from "path";
import webpack from "webpack";
import ExtractTextPlugin from "extract-text-webpack-plugin";

export default function (options)
{
	var nodeModules = {};

	// Build the modules for the server
	if (options.server && options.minimize && !options.debug)
		nodeModules = buildModules();

	const browsers =
	[
		//"last 2 version",
		"Android 2.3",
		"Android >= 4",
		"Chrome >= 35",
		"Firefox >= 31",
		"Explorer >= 9",
		"iOS >= 7",
		"Opera >= 12",
		"Safari >= 7.1"
	];

	const debug = !!options.debug;
	const server = !!options.server;
	const autoprefixer = !!options.autoprefixer;
	const script = server ? "server" : "app";

	const global =
	{
		__DEV__: debug,
		"process.env.NODE_ENV": debug ? "'development'" : "'production'"
	};

	const entry = {};
	entry[script] =
	[
		...(["./src/" + script + ".js"]),
		...(debug && !server ? ["webpack-hot-middleware/client"] : [])
	];

	const output =
	{
		path: path.join(__dirname, "./build" + (server ? "" : "/public")),
		publicPath: "/",
		filename: script + ".js",
		libraryTarget: server ? "commonjs2" : undefined
	};

	const plugins =
	[
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.DefinePlugin(global),
		new ExtractTextPlugin("app.css")
	];

	const stats =
	{
		colors: true,
		reasons: true,
		hash: true,
		version: true,
		timings: true,
		chunks: false,
		chunkModules: false,
		cached: debug,
		cachedAssets: debug
	};

	if (options.minimize)
	{
		plugins.push(
			new webpack.NoErrorsPlugin(),
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.AggressiveMergingPlugin(),
			new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
		);
	}

	if (debug)
	{
		if (!server)
		{
			plugins.push(
				new webpack.HotModuleReplacementPlugin(),
				new webpack.NoErrorsPlugin()
			);
		}
		else
		{
			plugins.push(new webpack.BannerPlugin("require('source-map-support').install();",
				{ raw: true, entryOnly: false }));
		}
	}

	const resolve =
	{
		extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"] // TODO: Remove .jsx
	};

	var query = undefined;

	if (debug && !server)
	{
		query =
		{
			plugins: ["react-transform"],
			extra:
			{
				"react-transform":
				{
					transforms:
					[
						{
							transform: "react-transform-hmr",
							imports: ["react"],
							locals: ["module"]
						},
						{
							transform: "react-transform-catch-errors",
							imports: ["react", "redbox-react"]
						}
					]
				}
			}
		};
	}

	const module =
	{
		loaders:
		[
			{
				test: /\.jsx?$/, // TODO: Remove .jsx
				include:
				[
					path.resolve(__dirname, "./node_modules/react-routing/src"),
					path.resolve(__dirname, "./src")
				],
				loader: "babel-loader",
				query
			},
			{
				test: /\.json$/,
				loader: "json-loader"
			},
			{
				test: /\.txt$/,
				loader: "raw-loader"
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
				loader: "url-loader?limit=10000"
			},
			{
				test: /\.(eot|ttf|wav|mp3)$/,
				loader: "file-loader"
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract("style-loader",
				[
					"css-loader",
					...(autoprefixer && ["autoprefixer-loader?" + JSON.stringify({browsers})]),
					"sass-loader"
				].join("!"))
			}
		]
	};

	var externals = undefined;

	if (server)
	{
		if (options.minimize && !options.debug)
			externals = nodeModules;
		else
		{
			externals =
				[
					function filter(context, request, callback)
					{
						const external =
							request.match(/^[a-z][a-z\/\.\-0-9]*$/i) &&
							!request.match(/^react-routing/) &&
							!context.match(/[\\/]react-routing/);
						callback(null, Boolean(external));
					}
				];
		}
	}

	var node = undefined;

	if (server)
	{
		node =
		{
			console: false,
			global: false,
			process: false,
			Buffer: false,
			__filename: false,
			__dirname: false
		}
	}

	return {
		entry,
		output,
		plugins,
		resolve,
		module,
		debug,
		stats,
		cache: debug,
		target: server ? "node" : "web",
		devtool: debug ? server ? "source-map" : "cheap-module-eval-source-map" : false,
		externals,
		node
	}
}

function buildModules()
{
	var nodeModules = {};

	fs.readdirSync("node_modules")
		.filter(function(x)
		{
			return [".bin"].indexOf(x) === -1;
		})
		.forEach(function (mod)
		{
			nodeModules[mod] = "commonjs " + mod;
		});

	return nodeModules;
}
