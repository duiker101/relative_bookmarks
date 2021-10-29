const terser = require("terser");

module.exports = async function (source) {
	const minified = (await terser.minify(source)).code;
	return `export default ${JSON.stringify(minified)}`;
};
