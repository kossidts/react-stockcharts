const webpack = require("webpack");
const path = require("path");

const { getIfUtils, removeEmpty } = require("webpack-config-utils");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

const rootPath = path.join(__dirname, "..");
// const currentScript = process.env.npm_lifecycle_event;
// const isWatch = currentScript === "watch";

function buildConfig(mode) {
	const { ifWatch, ifDocs } = getIfUtils(mode, ["docs", "watch"]);

	const devServer = {
		// contentBase: [
		//     path.join(rootPath, "docs"),
		//     path.join(rootPath, "build"),
		//     path.join(rootPath, "node_modules"),
		// ],
		static: [
			{
				directory: path.join(rootPath, "docs", "data"),
				publicPath: "/data",
			},
			{
				directory: path.join(rootPath, "build", "dist"),
				publicPath: "/dist",
			},
		],
		host: process.env.IP, // "10.0.0.106", "localhost"
		port: parseInt(process.env.PORT),
	};

	const context = rootPath;
	const loadersForDocs = [
		{ test: /\.jpg$/, use: ["file-loader"] },
		{ test: /\.(png|svg)$/, use: ["url-loader?mimetype=image/png"] },
		{
			test: /\.md$/,
			use: [
				"html-loader",
				{
					loader: "remarkable-loader",
					options: { remarkable: getRemarkable() },
				},
			],
		},
		{
			test: /\.scss$/,
			use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
		},
	];

	console.log("MODE", mode);
	return {
		context,
		entry: {
			"react-stockcharts-docs": "./docs/index.js",
		},
		mode: ifDocs("production", "development"),
		output: {
			path: path.join(rootPath, "build/"),
			filename: `dist/[name]${ifDocs(".[chunkhash]", "")}.js`,
			publicPath: "",
			library: "ReStock",
			libraryTarget: "umd",
			pathinfo: ifWatch(true, false), // since we have eval as devtool for watch, pathinfo gives line numbers which are close enough
		},
		devtool: ifWatch("cheap-source-map", "source-map"),
		stats: {
			children: true,
			errorDetails: true,
		},
		module: {
			rules: removeEmpty([
				// { test: /\.json$/, loader: "json" },
				{
					test: /\.(js|jsx)$/,
					use: ["babel-loader"],
					exclude: /node_modules/,
				},
				...loadersForDocs,
			]),
		},
		performance: {
			hints: false,
		},
		plugins: removeEmpty([
			new ProgressBarPlugin(),
			new webpack.NoEmitOnErrorsPlugin(),
			// new webpack.optimize.OccurrenceOrderPlugin(),

			ifDocs(
				new webpack.DefinePlugin({
					// This has effect on the react lib size
					"process.env.NODE_ENV": JSON.stringify("production"),
				})
			),
			// ifProd(new webpack.optimize.DedupePlugin()),
			// ifDocs(
			//     new webpack.optimize.UglifyJsPlugin({
			//         compress: {
			//             screw_ie8: true,
			//             warnings: false,
			//             drop_console: true,
			//         },
			//         sourceMap: true,
			//     })
			// ),
			new HtmlWebpackPlugin({
				template: "./docs/pageTemplate.js",
				inject: false,
				page: "index",
				mode,
				filename: "index.html",
			}),
			new webpack.LoaderOptionsPlugin({
				options: { remarkable: getRemarkable(), context },
			}),
		]),
		devServer,
		externals: {
			react: "React",
			"react-dom": "ReactDOM",
			// "d3": "d3",
		},
		resolve: {
			extensions: [".js", ".scss", ".md"],
			alias: {
				"react-stockcharts": path.join(rootPath, "src"),
			},
			modules: ["docs", "node_modules"],
		},
	};
}

function getRemarkable() {
	const Prism = require("prismjs");

	require("prismjs/components/prism-jsx");
	require("prismjs/plugins/line-numbers/prism-line-numbers");

	return {
		preset: "full",
		html: true,
		linkify: true,
		typographer: true,
		highlight: function (str, lang) {
			const grammer =
				lang === undefined || Prism.languages[lang] === undefined
					? Prism.languages.markup
					: Prism.languages[lang];
			return Prism.highlight(str, grammer, lang);
		},
	};
}

module.exports = buildConfig;
