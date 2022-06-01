import { closest } from "./Utils";
import chroma from 'chroma-js';

export const Coloring = {
    WColors: [],
    WilayasColoring(Fields, Colors, newRanges, which, MapStyler, ParentSelector, options) {
        try {
            Fields.filter(value => {
                if (value.name.match(/^(?!w)\w+$/)) return false;
                return true
            }).map(value => {

                const id = value.name
                MapStyler.Selector = `${ParentSelector} #${id}`
                const Values = value.values.get(0).split(','),
                    val = Values[which]
                const Color = chroma(Colors[closest(val, newRanges)]).brighten(options.MaxInt).saturate(options.Saturation)
                MapStyler.Style(`fill: ${Color}; transition: all .2s ease-in-out;); `)
                MapStyler.Style(`filter: brightness(1.5);`, 'hover')
                this.WColors[id] = Color
            })
        } catch (err) {}
    }
}