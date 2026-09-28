const esbuild = require("esbuild")
const fs = require("fs")
const path = require("path")

const entry = ["src/main.ts", "src/index.ts", "src/main.js", "src/index.js"]
	.map((p) => path.join(__dirname, p))
	.find((p) => fs.existsSync(p))

if (!entry) {
	console.error("No entry found. Expected src/main.ts or src/index.ts")
	process.exit(1)
}

const isProd = process.env.NODE_ENV === "production"

const options = {
	entryPoints: [entry],
	bundle: true,
	outfile: "scripts/main.js",
	format: "esm",
	platform: "neutral",
	external: ["@minecraft/*"],
	target: "es2022",
	sourcemap: isProd ? "external" : "inline",
	minify: isProd,
	charset: "utf8",
	legalComments: isProd ? "none" : "inline",
	logLevel: "info",
}

const mode = process.argv[2]

if (mode === "watch") {
	esbuild
		.context(options)
		.then((ctx) => ctx.watch())
		.catch(() => process.exit(1))
} else {
	esbuild.build(options).catch(() => process.exit(1))
}
