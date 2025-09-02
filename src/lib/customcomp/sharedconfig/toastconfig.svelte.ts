const configstoragekey = "@startpage/toastconfig"

export const toastconfig: {
    position : 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center',
    expand: boolean,
    richColors: boolean,
    closeButton: boolean,
    duration: number
}  = $state({
    position : "top-center",
    expand: false,
    richColors: false,
    closeButton: true,
    duration: 100000
})

export function setToastConfig(newConfig : {
    position : 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center',
    expand: boolean,
    richColors: boolean,
    closeButton: boolean,
    duration: number
}) {
    for (const key in newConfig) {
        if (Object.prototype.hasOwnProperty.call(newConfig, key)) {
            toastconfig[key] = newConfig[key];
        }
    }
    localStorage.setItem(configstoragekey, JSON.stringify(newConfig))
}

export function getToastConfig() {
    const localToast = JSON.parse(localStorage.getItem(configstoragekey));
    if(localToast){
        for (const key in localToast) {
            console.log(key)
            if (Object.prototype.hasOwnProperty.call(localToast, key)) {
                toastconfig[key] = localToast[key];
            }
        }
    } else{
        //Auto set config to default in localstorage
        setToastConfig({...toastconfig});
    }
    return toastconfig;
}