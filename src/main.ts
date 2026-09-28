import { world, system } from "@minecraft/server"

world.afterEvents.playerSpawn.subscribe((ev) => {
	if (!ev.initialSpawn) return
	ev.player.sendMessage("§aPack loaded.")
})
