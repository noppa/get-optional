module.exports = {
	moduleFileExtensions: [
		"ts",
		"tsx",
		"js"
	],
	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest"
	},
	globals: {
		"ts-jest": {
			tsConfigFile: "tsconfig.json"
		},
	},
	testMatch: [
		"**/tests/*.+(ts|tsx|js)"
	],
	roots: ["tests"]
}