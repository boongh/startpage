import modesConfig from "$lib/customcomp/modeEngine/modesConfig.json"


interface ModeConfig {
    name: string,
    source: string,
}

export let modes : ModeConfig[] = $state([])

export const DefaultMode = modesConfig.default

export function getModes(){
    modes = modesConfig.modes
}