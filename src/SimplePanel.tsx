import Legend							from './ts/Legend'
import Tooltip							from './ts/Tooltip'
import { Select } 						from '@grafana/ui';
import { InitData } 					from './load';
import { addStyle } 					from 'js/head';
import { PanelProps } 					from '@grafana/data';
import { SimpleOptions } 				from 'types'; 
import React, { useState, useEffect }	from 'react';
import DZMap  							from './map'

import './css/controls.css'
import svgPanZoom from 'svg-pan-zoom'

function resetMap(s) {
    s.resize()
    s.fit()
    s.center()
}

interface Props extends PanelProps<SimpleOptions> { }


export const DZMapPanel: React.FC<Props> = (A) => {  

	const { options, data } = A,  
			pid 					= A.id ,
			MapContainer  			= "dzmap-"  + pid,
		    ttId 					= `tooltipContainer-${pid}`
	let 	[which, setWhich] 		= useState(0);
	var 	Overrides 				= {}

	A.fieldConfig.overrides.forEach((item) => {
		Overrides[item.matcher.options] = item.properties[0].value[0]
	})
	
	var 	Load 		= InitData(data, A, which)
	const 	labels 		= options.Labels.split(','),
	 		Options 	= Array.from({length: labels.length}, (x, i) => { return {label: labels[i], value: i } } )

	let showLegend 		= (options.showLegend) ? [ <Legend Ranges={Load.Ranges} newRanges={Load.newRanges} Colors={Load.Colors} Panel={A.id} options={options} />] : []
	let gridOpts 		= (options.showLegend) ? 'auto 100px' : 'auto'

	addStyle(Load.MapStyler._Style )

	useEffect(() => {
		const s = svgPanZoom(`#${MapContainer}`)
		$(`#resetZoom-${pid}`).on('click', function() {
			resetMap(s)
		})
		$(`#${MapContainer} .wilaya`).on("mouseenter", function() {
			let id = $(this).attr('id')
			$(`${MapContainer} #c${id}`).css('filter', 'brightness(2)')
		}).on('mouseleave', function() {
			let id = $(this).attr('id')
			$(`#${MapContainer} #c${id}`).css('filter', 'brightness(1)')
		})
	}, [])
	


 return (<>
	<div className="title" style={{width: "100px", position: "absolute", right: 0, top: 0}}>
	<Select options={Options} value={which} onChange={(selectableValue) => {
		var url = new URL(window.location.href);
		url.searchParams.set('which', String(selectableValue.value));
		window.history.pushState(null, null, url.href)
		setWhich(selectableValue.value) 
	}} />
	</div>
	<Tooltip id={ttId} Parent={pid} Color={options.Color_1} Wilayas={Load.Wilayas} Labels={labels}></Tooltip>

    <div style={{display: 'grid', gridTemplateColumns: gridOpts }}>
		<div style={{margin: "auto", width: "100%"}}>
		<DZMap 
			Parent={pid} 
			id={MapContainer} 
			which={which} 
			Circles={Load.Circles} 
			DataLinks={A.fieldConfig.defaults.links} 
			Overrides={Overrides} 
			height={A.height} 
			options={options} 
		/>
			<div id="controls">
				<button className='control' id={"resetZoom-" + A.id} >Reset</button>
			</div>
		</div>
		{showLegend}
    </div>
</>
  );

   
}