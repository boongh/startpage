export let name = $state({name : "User"})
export function setName(newName : string) : void{
    name.name = newName;
    console.log("new name: ", newName)
    window.localStorage.setItem("@startpage/username", newName)
}
export function getName() : {name: string}{
    const localName = window.localStorage.getItem("@startpage/username")
    if(localName == null){
        setName("User");
    } else{
        setName(localName);
    }
    return name;
}
