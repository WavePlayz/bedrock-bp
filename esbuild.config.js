const esbuild = require("esbuild")

const options = {
	entryPoints: ["src/main.ts"],
	bundle: true,
	outfile: "scripts/main.js",
	format: "esm",
	platform: "neutral",
	external: ["@minecraft/*"],
}

const context = esbuild.context(options)

context.then((ctx) => ctx.watch()).catch(() => process.exit(1))
