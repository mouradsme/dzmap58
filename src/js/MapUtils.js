import { closest } from './Utils.js'
import chroma from 'chroma-js';
import { Parents } from '../js/Wilayas'
export const MapData = {
    Wilayas: [],
    Circles: [],
    Max: 0,
    Min: 0,
    Legend(Ranges, newRanges, Colors) {
        let Legend = []
        for (let i = 0; i < Ranges.length; i++) {

            let feText = `${Ranges[i]}` + ((i == Ranges.length - 1) ? '+' : ' - ') + `${i == Ranges.length - 1 ? '' : Ranges[i+1]}`
            let Color = Colors[closest(Ranges[i], newRanges)]
            Legend.push([feText, Color])
        }
        return Legend
    },
    Populate(Fields, which, CircleLabel, Merge = false) {
        let Max = 0 // Initiate Minmax
        let Min = 0 // Initiate Minmax
        for (let i = 0; i < Fields.length; i++) { // Iterate through the retrieved fields
            let id = Fields[i].name // Set the ID for the current field 
                // In our case, each field represent either a Wilaya (w01 through w48) + any other columns in the table (ex: id, time ...)
                // We only need the Wilaya columns, so we'll filter out any colmun that doesn't start with "w" 
            if (id.match(/^(?!w)\w+$/)) continue;
            var Add = []
            if (Merge) {
                if (Object.keys(Parents).includes(id))
                    Parents[id].forEach(index => {
                        Add = []
                        let rValues = Fields[index - 1].values.get(0)
                        if ((Fields[index - 1].values.get(0).match(/,/g) || []).length > 0)
                            rValues = rValues.split(',')
                        rValues = rValues.map((item) => { return Number(item) })
                        Add = rValues
                    });
                if (id === "w49") break
            }
            // Each wilaya column has 0 to n values separated by a comma,
            // We'll put those values in an array of n+1 (array name is Values)
            var Values = Fields[i].values.get(0)
            if ((Fields[i].values.get(0).match(/,/g) || []).length > 0)
                Values = Values.split(',')
            Values = Values.map((item) => { return Number(item) })
                // let ValuesN = Values.length
                // We convert the values that are being used in the visualization to Numbers
                // Note that the which variable contains the index of the "class" that's being used in the visualization
                // And its value overlaps with the index in the Values array, hence val = Values[which] 

            if (Merge)
                Values = Values.map((item, index) => { return (isNaN(Add[index]) ? 0 : Add[index]) + item })

            let val = Number(Values[which])
            Max = val > Max ? val : Max // Check whether this is the max value and store it in Max if that's the case
            if (i == 0) Min = val // If this is the start of the iterations, then set Min to the value we get from the very first wilaya 
            Min = val < Min ? val : Min // If the value is smaller than the one previously stored in Min, set Min to this new smaller value
            this.Wilayas[id] = Values // Store the Values of the wilaya inside the wilayas object identified by an id (which is the wilaya name, aka: column name from DB)	
            this.Circles[`c${id}`] = Values[CircleLabel - 1] // Add the desired value to the Circles object, and identify it by the wilaya id
                // Note that options.circleLabel is used here as a means to give the user control on which data should the circles represent,
                // For example :

            /*  .-----------------------------------------
            [ ID |     w01     |     w02     | ... etc
            [ 1  | 10, 20, 30  |  5, 10, 10  | .. etc
            [ 2  | ........... | ........... | ... etc

            Now let's say, the query to fetch data is "SELET * FROM table where ID = 1;"
                The resulting objects would look like this :
                Wilayas = {
                    "w01": ["10", "20", "30"],
                    "w02": ["5", "10", "10"],
                    //.. and so on  
                }

                For example, we want the circles to represent the second value for each wilaya (options.circleLabel = 2)
                This means, w01 => 20 and w02 => 10 
                Circles = {
                    "cw01": 20,
                    "cw02": 10
                }

            */
        }
        this.Max = Max
        this.Min = Min
    }

}