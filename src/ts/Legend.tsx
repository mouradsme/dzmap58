import React from 'react';
import { MapData } from '../js/MapUtils'
import chroma from 'chroma-js';

export default function Legend(props) {
    const { Ranges, newRanges, Colors, Panel, options } = props
    const eid = `legend-${Panel}`
    let LegendChildren = []
    MapData.Legend(Ranges, newRanges, Colors).map(Item => {
        const LegendChild = <div className='legend'>
            <div className='legend-item-label'>{Item[0]}</div>
            <div className='legend-item-color' style={{backgroundColor: chroma(Item[1]).brighten(options.MaxInt).saturate(options.Saturation)}}></div>
        </div>
        LegendChildren.push(LegendChild)
    })
    return( <div id={eid}>{LegendChildren}</div>)
}