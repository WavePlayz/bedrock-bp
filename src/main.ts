import { GameMode, Player, system, world } from "@minecraft/server"
import { CustomForm } from "@minecraft/server-ui"

world.beforeEvents.itemUse.subscribe((event) => {
	const { itemStack, source } = event

	if (!(source instanceof Player)) return

	source.sendMessage("Hello World")
})
