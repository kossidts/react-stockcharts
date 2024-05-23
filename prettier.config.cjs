/** @type {import("prettier").Config} */
const config = {
	tabWidth: 4,
	useTabs: true,
	trailingComma: "es5",
	// eslintIntegration: true,
	arrowParens: "avoid",
	printWidth: 115,
	overrides: [
		{
			files: ["*.js", "*.jsx"],
			options: {
				arrowParens: "avoid",
			},
		},
	],
	experimentalTernaries: false,
};

module.exports = config;
