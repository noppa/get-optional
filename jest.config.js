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
	testRegex: "tests[\\\\/].+\\.spec\\.ts",
	roots: ["tests"]
}