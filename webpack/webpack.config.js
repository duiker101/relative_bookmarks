const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");

const fileExtensions = ["jpg", "jpeg", "png", "gif", "eot", "otf", "svg", "ttf", "woff", "woff2"];

const root = path.join(__dirname, "..");
const srcDir = path.join(root, "src");

const options = {
	mode: process.env.NODE_ENV || "development",
	entry: {
		popup: path.join(srcDir, "popup", "index.ts"),
		background: path.join(srcDir, "background", "index.ts"),
	},
	output: {
		path: path.join(root, "build"),
		filename: "[name].js",
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ["style-loader", "css-loader", "sass-loader"],
				exclude: /node_modules/,
			},
			{
				test: new RegExp(".(" + fileExtensions.join("|") + ")$"),
				use: "file-loader?name=[name].[ext]",
				exclude: /node_modules/,
			},
			{
				test: /\.html$/,
				use: "html-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.ts$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /bookmarklet.js$/,
				use: path.resolve(__dirname, "bookmarklet-loader.js"),
			},
		],
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	plugins: [
		new CleanWebpackPlugin({
			cleanStaleWebpackAssets: false,
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: "src/manifest.json",
					transform: function (content, path) {
						return Buffer.from(
							JSON.stringify({
								version: process.env.npm_package_version,
								...JSON.parse(content.toString()),
							})
						);
					},
				},
			],
		}),
		new HtmlWebpackPlugin({
			template: path.join(srcDir, "popup", "index.html"),
			filename: "popup.html",
			chunks: ["popup"],
		}),
		new WriteFilePlugin(),
	],
};

if (process.env.NODE_ENV === "development") {
	options.devtool = "source-map";
}

module.exports = options;
