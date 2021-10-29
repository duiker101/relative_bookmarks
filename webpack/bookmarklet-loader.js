const terser = require("terser");

module.exports = async function (source) {
	const options = { mangle: { reserved: ["relative_mark_101"], toplevel: true } };
	const minified = (await terser.minify(source, options)).code;

	return `export default ${JSON.stringify(minified)}`;
};
