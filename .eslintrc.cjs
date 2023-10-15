
module.exports = {
	"plugins": [
		"import",
		"flowtype",
		"jsx-a11y",
		"react",
		"eslint-plugin-prettier"
	],
	"parser": "@babel/eslint-parser",
	"parserOptions": {
		"ecmaVersion": 2018,
		"sourceType": "module",
		"ecmaFeatures": {
			"jsx": true
		}
	},
	"env": {
		"browser": true,
		"node": true,
		"es6": true,
		"jest": true
	},
	"settings": {
		"react": {
			"version": "16.0"
		},
		"import/ignore": [
			"node_modules",
			"\\.(json|css|jpg|png|gif|eot|svg|ttf|woff|woff2|mp4|webm)$"
		],
		"import/extensions": [".js", ".jsx"],
		"import/resolver": {
			"node": {
				"extensions": [".js", ".jsx", ".json"]
			},
			"react-stockcharts": "./src"
		},
		"flowtype": {
			"onlyFilesWithFlowAnnotation": true
		}
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:react/jsx-runtime",
		"plugin:jsx-a11y/recommended",
		"plugin:react-hooks/recommended",
		"plugin:flowtype/recommended",
		"plugin:import/errors",
		"plugin:import/warnings",
		// "plugin:prettier/recommended",
		"eslint-config-prettier"
	],
	"rules": {
		// "prettier/prettier": "warn",
		"jsx-a11y/aria-role": "warn",
		"jsx-a11y/img-redundant-alt": "warn",
		"jsx-a11y/no-access-key": "warn",
		"jsx-a11y/click-events-have-key-events": "off",
		"flowtype/define-flow-type": "warn",
		"flowtype/require-valid-file-annotation": "warn",
		"flowtype/use-flow-type": "warn",
		"react/jsx-pascal-case": "warn",
		"react/jsx-uses-react": "warn",
		"react/jsx-uses-vars": "warn",
		"react/jsx-no-bind": "warn",
		"react/jsx-no-undef": "warn",
		"react/display-name": "warn",
		"react/prefer-es6-class": "warn",
		"react/prop-types": "warn",
		"react/react-in-jsx-scope": "warn",
		"no-var": "error",
		"prefer-const": "error",
		"array-bracket-spacing": ["error", "never"],
		"block-scoped-var": "error",
		"brace-style": ["error", "1tbs", { "allowSingleLine": true }],
		"comma-spacing": ["error", { "before": false, "after": true }],
		"eqeqeq": ["error", "smart"],
		"key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
		"indent": [
			"error",
			"tab",
			{
				"SwitchCase": 1,
				"flatTernaryExpressions": false
			}
		],
		// "comma-dangle": 0,
		"jsx-quotes": ["error", "prefer-double"],
		"no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
		"no-trailing-spaces": ["error", { "skipBlankLines": false }],
		"no-undef": 2,
		"no-console": ["warn", { "allow": ["info", "warn", "error"] }],
		"no-unused-vars": "warn",
		"object-curly-spacing": ["error", "always"],
		"quotes": ["error", "double", { "avoidEscape": true }],
		"semi": ["error", "always"],
		"semi-spacing": ["error", { "before": false, "after": true }],
		"keyword-spacing": [
			"error",
			{ "before": true, "after": true, "overrides": {} }
		],
		"space-before-blocks": "error",
		"space-before-function-paren": [
			"error",
			{ "named": "never", "anonymous": "never", "asyncArrow": "always" }
		],
		"space-infix-ops": ["error", { "int32Hint": false }],
		"spaced-comment": ["error", "always", { "exceptions": ["-"] }]
	}
}