import { MapData } from './MapUtils'
import chroma from 'chroma-js';
import React, { useEffect } from 'react'
export function createLegend(Ranges, newRanges, Colors, Pid, options) {
    useEffect(() => {
        const eid = `legend-${Pid}`
        if (document.getElementById(eid) !== null) {
            document.getElementById(eid).innerHTML = ''
            MapData.Legend(Ranges, newRanges, Colors).map(Item => {
                const Div = document.createElement('div');
                Div.className = 'legend'

                const LegendLabel = document.createElement('div')
                LegendLabel.innerHTML = Item[0]
                Div.appendChild(LegendLabel)

                const LegendColor = document.createElement('div')
                LegendColor.style.backgroundColor = chroma(Item[1]).brighten(options.MaxInt).saturate(options.Saturation)
                LegendColor.innerHTML = ''
                Div.appendChild(LegendColor)
                document.getElementById(eid).appendChild(Div)
            })
        }
    })
}