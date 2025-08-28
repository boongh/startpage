export const num = $state({
    count:0,
    add: (num2: number) : void => {
        this.count += num2
    }
})