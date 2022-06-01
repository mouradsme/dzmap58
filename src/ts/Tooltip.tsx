import React from 'react'
import $ from 'jquery'
import { WilayaNames } from '../js/Wilayas'
import '../css/tooltip.css'

export default function Tooltip(props) {
    const { Parent, id, Color, Labels, Wilayas } = props
    const ParentElement = `[data-panelid='${Parent}']`
    var Tooltip =  <div id={id}>
                    <span className="info" style={{backgroundColor: Color}}>
                        <div className="tt-title">Test</div>
                        <div className="tt-more">Test</div> 
                    </span>
                </div>
    $(function( ) {
        const e = $('#' + id)
        $(ParentElement + " .wilaya").hover( function() {
            let id = $(this).attr('id')
            let name = WilayaNames[id]  
            try {
                if (id) {
                    let more = ``
                    let vals = Wilayas[id]
                    for (let i = 0; i < Labels.length; i++)
                        more += `<div class="more-class">
                            <div>${Labels[i]}</div>
                            <div>${vals[i]}</div>
                        </div>`
                    e.find(' .tt-title').text(`${name}`)
                    e.find(' .tt-more').html(more)
                    e.find(' .info').stop().fadeIn(100)
                }
            } catch (e) {
    
            }
    
        }, function() {
            let id = $(this).attr('id')
            try {
                if (id) {
                    e.find(' .info').stop().fadeOut(100)
                    e.find(' .tt-title').text(``)
                    e.find(' .tt-more').html('')
                }
            } catch (e) {
    
            }
        });

    })

    return Tooltip
}