const fs = require("fs")
const path = require("path")
const crypto = require("crypto")

const file = path.join(__dirname, "manifest.json")
const m = JSON.parse(fs.readFileSync(file, "utf8"))

const fillUUIDs = () => {
	let changed = false
	if (m.header.uuid === "RANDOM") {
		m.header.uuid = crypto.randomUUID()
		changed = true
	}
	if (m.modules[0]?.uuid === "RANDOM") {
		m.modules[0].uuid = crypto.randomUUID()
		changed = true
	}
	if (changed) fs.writeFileSync(file, JSON.stringify(m, null, "\t") + "\n")
}

// Non-interactive: just fill UUIDs and exit.
if (!process.stdin.isTTY) {
	fillUUIDs()
	console.log("✓ manifest.json written (non-interactive)")
	process.exit(0)
}

const readline = require("readline")
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})
const ask = (q, def = "") =>
	new Promise((res) =>
		rl.question(def ? `${q} (${def}): ` : `${q}: `, (a) => res(a.trim() || def))
	)

;(async () => {
	console.log("── Pack setup ──")
	const curName = m.header.name === "My Pack" ? "" : m.header.name
	const name = await ask("Pack name", curName)
	if (name) m.header.name = name
	const desc = await ask("Description", m.header.description || "")
	m.header.description = desc

	fillUUIDs()
	rl.close()
	console.log("✓ manifest.json written")
})()
