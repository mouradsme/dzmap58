
import { FieldConfigProperty, PanelPlugin }   from '@grafana/data';
import { SimpleOptions }                      from './types';
import { DZMapPanel }                         from './SimplePanel';
import { circlesLabelsSelection }             from './options/circlesLabelsSelection'

export const plugin = new PanelPlugin<SimpleOptions>(DZMapPanel)
.useFieldConfig({
  disableStandardOptions: [
    FieldConfigProperty.Min, 
    FieldConfigProperty.Max, 
    FieldConfigProperty.Unit,
    FieldConfigProperty.NoValue,
    FieldConfigProperty.Color,
    FieldConfigProperty.Decimals,
    FieldConfigProperty.DisplayName,
    FieldConfigProperty.Mappings,
  ]
})
.setPanelOptions(builder => {
  return builder

  .addTextInput({
    path: 'Labels',
    name: 'Titres/Classes',
    description: 'Selon les données retournées de la BDD, donnez un nom pour leurs classes comme suit "Classe 1, Classe 2, ..."',
    defaultValue: "Class 1, Class 2",
    category: ["Options des classes"]
  })
  .addRadio({
      path: 'choroplethDiv',
      defaultValue: 'byInterval',
      name: 'Comment définir les niveaux?',
      settings: {
        options: [
          {
            value: 'byLevel',
            label: 'Par niveau',
          },
          {
            value: 'byInterval',
            label: 'Par interval',
          },
          {
            value: 'Linear',
            label: 'Quartiles',
          },
        ],
      },
      category: ["Options des classes"]
    })
  .addNumberInput({
      path: '_Level',
      name: 'Nombre de niveaux',
      description: 'Si par exemple la différence entre la valeur maximale et la valeur minimale parmi les données est de 7000, celle-ci va être divisée par la valeur choisie dans cette option pour préparer les niveaux de la charte Choropleth',
      defaultValue: 5,
      settings: {
        min: 2,
        step: 1
      },
      showIf: config => config.choroplethDiv === 'byLevel' ,
      category: ["Options des classes"]
    })
	.addNumberInput({
      path: '_Number',
      name: 'Nombre d\'éléments dans chaque niveau',
      description: 'Cette option permet de créer les niveaux commençant de la valeur 0 avec un pas choisi dans cette option (1000 par exemple), jusqu\'une valeur égale ou supérieure à la valeur maximale ',
      defaultValue: 100,
      settings: {
        min: 1,
        step: 1
      },
      showIf: config => config.choroplethDiv !== 'byLevel'  &&  config.choroplethDiv === "byInterval",
      category: ["Options des classes"]
    })
  .addRadio({
      path: 'spectrum',
      defaultValue: 'SingleColor',
      name: 'Quelle palette de couleurs?',
      settings: {
        options: [
          {
            value: 'SingleColor',
            label: 'Une Couleur',
          },
          {
            value: 'Heatmap',
            label: 'Personnalisée',
          }
        ],
      },
      showIf: config => config.choroplethDiv !== "byLevel",
      category: ["Options des Couleurs"]
    })
  .addColorPicker ({
      path: 'Color_1',
      name: "Couleur 1",
      description: 'Couleur pour les petites valeurs/Couleur de base pour le mode d\'une seule couleur ',
      defaultValue: "white",
      category: ["Options des Couleurs"]

      
    })
  .addColorPicker ({
      path: 'Color_2',
      name: "Couleur 2",
      description: 'Couleur pour les valeurs moyennes',
      defaultValue: "blue",
      showIf: config =>  config.spectrum == 'Heatmap',
      category: ["Options des Couleurs"]
      
    })
  .addColorPicker ({
      path: 'Color_3',
      name: "Couleur 3",
      description: 'Couleur pour les grandes valeurs',
      defaultValue: "black",
      showIf: config =>  config.spectrum == 'Heatmap',
      category: ["Options des Couleurs"]
    })
    
  .addSliderInput ({
      path: 'MaxInt',
      name: "Luminosité ",
      settings: {
        min: 0,
        max: 10,
        step: 0.1
      },
      description: 'La Luminosité des couleurs',
      defaultValue: 0,
      showIf: config => config.choroplethDiv !== "byLevel",
      category: ["Options des Couleurs"]
    })
  .addSliderInput ({
      path: 'Saturation',
      name: "Saturation ",
      settings: {
        min: 0,
        max: 10,
        step: 0.1
      },
      description: 'La Saturation des couleurs',
      defaultValue: 0,
      showIf: config => config.choroplethDiv !== "byLevel",
      category: ["Options des Couleurs"]
    })
  .addBooleanSwitch({
      path: 'circles',
      name: 'Cercles',
      description: 'Utiliser les cercles de densité?',
      defaultValue: false,
      category: ["Options des Cercles"]
    })
  .addCustomEditor({
      id: 'circlesLabelsSelection',
      editor: circlesLabelsSelection,
      name: 'Colonne',
      path: 'circleLabel',
      description: 'Nombre de la colonne à utiliser?',
      defaultValue: 1,
      settings: {
        min: 1,
        step: 1
      },
      showIf: config => config.circles,
      category: ["Options des Cercles"]
    })
  .addNumberInput({
      path: 'circleRadius',
      name: 'Diamètre Max',
      description: 'Diamètre Maximal',
      defaultValue: 10,
      
      showIf: config => config.circles,
      category: ["Options des Cercles"]
    })
  .addColorPicker({
      path: 'circleColor',
      name: 'Couleur',
      description: "Couleur pour les cercles",
      defaultValue: "red",
      category: ["Options des Cercles"]
    })
    .addBooleanSwitch ({
        path: 'showLegend',
        name: 'Légende',
        description: '',
        defaultValue: true,
        category: ["Options Additionnels"]
  
      })
      .addBooleanSwitch ({
          path: 'MergeWilayas',
          name: 'Fusionner',
          description: '',
          defaultValue: false,
          category: ["Options Additionnels"]
    
        })
});
