module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": [
		"standard-with-typescript",
		"plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
	],
	"overrides": [
		{
			"env": {
				"node": true
			},
			"files": [
				".eslintrc.{js,cjs}"
			],
			"parserOptions": {
				"sourceType": "script"
			}
		}
	],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module",
    "tsconfigRootDir": __dirname,
		"project": ['./tsconfig.json']
	},
	"plugins": [
		"react",
		"@typescript-eslint"
	],
	"rules": {
    "@typescript-eslint/no-unused-vars": 1,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-empty-interface": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/camelcase": 0,
    "@typescript-eslint/strict-boolean-expressions": 0,
    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/ban-types": 1,
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "semi": [2, "always"]
  }
}
