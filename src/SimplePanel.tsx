import DZMap  							from './map'
import { Select } 						from '@grafana/ui';
import { InitData } 					from './load';
import { addStyle } 					from 'js/head';
import { PanelProps } 					from '@grafana/data';
import { SimpleOptions } 				from 'types'; 
import React, { useState } 	from 'react';
import { dzTooltip, ttStyle} 			from 'js/tooltip'

import './css/controls.css'

interface Props extends PanelProps<SimpleOptions> { }


export const DZMapPanel: React.FC<Props> = (A) => {   
	const { options, data, height } = A,  
			DataLinks 				= A.fieldConfig.defaults.links, 
			pid 					= A.id ,
		    ttId 					= `tooltipContainer-${pid}`,
			maptype					= options.MapType
	var 	Overrides 				= {}
	let 	[which, setWhich] 		= useState(0);
	
	A.fieldConfig.overrides.forEach((item) => {
		Overrides[item.matcher.options] = item.properties[0].value[0]
	})
	
	let 	Load 		= InitData(data, A, which)
	const 	labels 		= options.Labels.split(','),
	 		Options 	= Array.from({length: labels.length}, (x, i) => { return {label: labels[i], value: i } } )

	let showLegend 		= (options.showLegend) ? [ <div id={`legend-${pid}`}>  </div>] : []
	let gridOpts 		= (options.showLegend) ? 'auto 100px' : 'auto'

	dzTooltip(`#${ttId}`, Load.Wilayas, labels, pid) 
	addStyle(Load.MapStyler._Style + ttStyle(options.Color_1, `[data-panelid='${pid}']`))

	
 return (<>
	<div className="title" style={{width: "100px", position: "absolute", right: 0, top: 0}}>
	<Select options={Options} value={which} onChange={(selectableValue) => {
		var url = new URL(window.location.href);
		url.searchParams.set('which', String(selectableValue.value));
		window.history.pushState(null, null, url.href)
		setWhich(selectableValue.value) 
	}} />
	</div>
	<div id={ttId}></div>
    <div style={{display: 'grid', gridTemplateColumns: gridOpts }}>
		<div style={{margin: "auto", width: "100%"}}>
			<DZMap MapType={maptype} Parent={pid} circleRadius={options.circleRadius} data={Load.Circles} c={options.circles} which={which} DataLinks={DataLinks} Overrides={Overrides} height={height} id="dzmap" />
			<div id="controls">
				<button className='control' id="resetZoom">Reset</button>
			</div>
		</div>
		{showLegend}
    </div>
</>
  );

   
}