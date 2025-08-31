export let commandsConfig : {
    id: string, 
    name: string, 
    task: "command" | "url",
    url: string,
    command:
} = $state({})

export function getCommands(){
    const commandsStr = localStorage.getItem("@startpage/commands");
    if(commandsStr != null){
        const localCommands = JSON.parse(commandsStr);
        commandsConfig = localCommands
    }
}
export function setCommands(){
    localStorage.setItem("@startpage/commands", JSON.stringify(commandsConfig));
}