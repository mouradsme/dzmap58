import $ 							from 'jquery'
import chroma 						from 'chroma-js';
import { MapData } 					from 'js/MapUtils'
import { Coloring } 				from 'js/Coloring'
import { Styler, createArrayOfkey } from 'js/Utils'
import './css/legend.css'

export const InitData = (data: any, A: any, Which: number = null, WhichCircle: number = null) => {
	const 	Series 			= data.series, 		// Get series from Data Panel data object. Data fetched from a Database/Data Source is stored in the Series Object as a constant
	 		Fields 			= Series[0].fields,	// Fetch Fields (classes), from the series Object
			options			= A.options,		// Fetching Panel Options
	 		ThreshColors 	= createArrayOfkey(A.fieldConfig.defaults.thresholds.steps, 'color').slice(0, options._Level),
			ParentElem 		= "[data-panelid='" + A.id + "'] ", 			// Current Data Panel Selector (Using Panel ID)
	 		MapContainer 	= `#MapContainer-${A.id}`,						// Get all the panel related options set by user
			which 			= Which == null ? options.whichClass : Which,	// Which class is used for data visualization
			whichCircle		= WhichCircle == null ? options.whichCircle : WhichCircle,
			MapStyler		= Styler		// Map Style (CSS)
			MapData.Populate(Fields, {which, whichCircle}, options.circleLabel, options.MergeWilayas)
	const 	Min 			= MapData.Min, 
		  	Max 			= MapData.Max,
			diff 			= Max - Min, 	 // Start by calculating the spread (the difference between the highest value and the lowest value)
			divn = (options.choroplethDiv == 'byLevel') ? 
						Math.ceil(diff/options._Level) : options._Number 

	var 	Ranges:number[] = [] 		// Prepare a ranges array (to prepare levels so as to classify wilayas)

	if(!options.circles)  // Hide/Show circles
		$(`${MapContainer} svg circle`).fadeOut(100)
	else 
		$(`${MapContainer} svg circle`).fadeIn(100)

	// Now, depending on which mode the user is using:
	Ranges 	= (options.choroplethDiv == "Linear")  ? 
				Array.from([0, 0.25, 0.50, 0.75, 1], (x, i) => Math.ceil(x * diff)) : 
				Array.from({length: Math.ceil(diff/divn)}, (x, i) => divn*i);
	
	let Colors 	= options.spectrum == 'SingleColor' ? 
					['white', options.Color_1] : [options.Color_1, options.Color_2, options.Color_3] 	// Put the Corresponding colors in the Colors array (The order matters, where the first color corresponds to the small values, the second for the mid-values...)
	let prec 	= 1
	if (options.choroplethDiv == 'byLevel') {
		Colors 	= ThreshColors, 
		prec 	= 1
	}
	
	const 	PLength 	= prec * Ranges.length 
			Colors 		= chroma.scale(Colors).colors(PLength);
	let 	newRanges 	= Array.from({length: PLength}, (x, i) => Math.ceil((diff/PLength))*(i));
	// New ranges is an extension of the ranges array by a factor of prec
	// Meaning that each element in Ranges, will be divided into prec elements including the element itself
	Coloring.WilayasColoring(Fields, Colors, newRanges, {which, whichCircle}, MapStyler, `${ParentElem} ${MapContainer}`, options)
	// createLegend(Ranges, newRanges, Colors, A)

	return {
		MapStyler, 
		Wilayas: MapData.Wilayas, 
		Circles: MapData.Circles,
		WColors: Coloring.WColors,
		Ranges, newRanges, Colors

	}
} 