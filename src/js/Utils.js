export function closest(num, arr) {
    for (var i = 1; i < arr.length; i++) {
        if (num < arr[i]) {
            return i - 1
        }
        if (i == arr.length - 1) {

            return i
        }
    }
    return -1;
}
export const Styler = {
    _Style: '',
    Selector: '',
    Style(CSS, on) {
        let On = ''
        if (on && on.length > 0) On = `:${on}`
        this._Style += `
		${this.Selector}${On} {
			${CSS}
		}
		`
    }
}
export function createArrayOfkey(array, key) {
    let Populated = []
    if (array != null) // If the Thresholds exist, add them to the Threshold Colors
        for (let i = 0; i < array.length; i++)
        Populated.push(array[i][key])
    return Populated
}