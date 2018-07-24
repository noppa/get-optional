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
		"ROOT_DIR": __dirname
	},
	testRegex: "tests[\\\\/].+\\.spec\\.ts",
	roots: ["tests"]
}