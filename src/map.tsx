import React, { useState } from 'react';
import $ from 'jquery'
import "@szhsin/react-menu/dist/index.css";
import { MenuItem, ControlledMenu, useMenuState } from "@szhsin/react-menu";
import { addStyle } from 'js/head';
import { get as Map } from './maps/map_58'

export default function DZMap(props) {
  const { id, height, DataLinks, Overrides, Parent, options, Circles} = props; 
  const [menuProps, toggleMenu] = useMenuState();
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
     
  let ParentElem 		= "[data-panelid=" + Parent + "] ";
  let MapContainerId 	= 'MapContainer-' + Parent
  var [elem, setElem] = useState(null);
  var MenuItems = []
  for (let i = 0; i < DataLinks?.length; i++) {
    let link = DataLinks[i].url //link = link.replace('${__field.name}', elem) + `&which=${which}`
    let title = DataLinks[i].title
    if (Object.keys(Overrides).includes(elem)) {
      link = Overrides[elem].url
      title = Overrides[elem].title
    } 	  
	MenuItems.push(<MenuItem onClick={(e) => { window.open( link, '_blank' ); }}>{title}</MenuItem>)

  }
  
  $(ParentElem+' .wilaya').on('mousedown', function(event) {
    switch (event.which) {
        case 3:
            setElem($(this).attr('id'))
            break;
        default:
    }

    addStyle(`${ParentElem} #${MapContainerId} { width: 100%; } `)
    
  });
  var _Map = Map(id, height, Circles, options); 
  return <>
  <div id={MapContainerId} style={{width: 'fit-content(70%)', margin: 'auto'}} onContextMenu={e => {
  e.preventDefault();
  setAnchorPoint({ x: e.clientX, y: e.clientY });
  toggleMenu(true);
  }}>
  <ControlledMenu {...menuProps} anchorPoint={anchorPoint}
      onClose={() => toggleMenu(false)}>
      {MenuItems}
  </ControlledMenu>
  { _Map }
  </div></>;
}


