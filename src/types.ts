type ChoroplethType = 'byLevel' | 'byInterval' | 'Linear'
type spectrumTypes = 'SingleColor' | 'Heatmap'
export interface SimpleOptions {
  Labels: string;
  choroplethDiv: ChoroplethType;
  spectrum: spectrumTypes;
  _Level: number;
  _Number: number;
  whichTable: string;
  whichDataSource: string;
  Data: any;
  MaxInt: number;
  Saturation: number;
  showLegend: boolean;
  MergeWilayas: boolean;
  circles: boolean;
  circleLabel: number;
  circleRadius: number;
  circleColor: string;
  Color_1: string;
  Color_2: string;
  Color_3: string;
}
