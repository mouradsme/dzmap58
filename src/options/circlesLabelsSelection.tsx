import React                    from 'react';
import {  Select }              from '@grafana/ui';
import {  StandardEditorProps } from '@grafana/data';

export const circlesLabelsSelection: React.FC<StandardEditorProps<number>> = ({  value, onChange, context }) => {
    var options = [];
    context.options.Labels.split(',').map((label, index) => {
        options.push({
          label: label,
          value: index+1,
        });
    })
   
    return <Select options={options} value={value} onChange={(selectableValue) => { onChange(selectableValue.value) ; }} />;
};