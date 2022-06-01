import { SVG } from '@svgdotjs/svg.js'
import svgPanZoom from 'svg-pan-zoom'
import React, { useEffect } from 'react'

function resetMap(s) {
    s.resize()
    s.fit()
    s.center()
}
export function minmax(Circles) {
    let max = 0
    let min = null
    for (const key in Circles) {
        let n = Number(Circles[key])
        if (n > max) max = n;
        if (min == null || n <= min) min = n;
    }
    return { min, max }
}

export function createCircles(Circles, ParentElem, MapContainer, options) {
    const { max } = minmax(Circles)
    var CirclesLength = $(`${ParentElem} .wilaya`).length
        // The following hool will be called only once at mount,
    useEffect(() => {
        if (CirclesLength == 0)
            $(`${ParentElem} .wilaya`).each((i, item) => {
                try {
                    let wid = $(item).attr('id')
                    let Item = SVG(`${MapContainer}  #${wid}`)
                    let bbox = Item.bbox()
                    let cx = bbox.x + bbox.w / 2
                    let cy = bbox.y + bbox.h / 2
                    const svg = $(`${MapContainer}  svg`)[0];
                    const Circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');

                    let radius = Number(Circles[`c${wid}`]) * options.circleRadius / max
                    if (!isNaN(radius)) {
                        Circle.setAttribute("cx", `${cx}`);
                        Circle.setAttribute("cy", `${cy}`);
                        Circle.setAttribute("r", `${radius}`);
                        Circle.setAttribute("fill", options.circleColor);
                        Circle.style.stroke = "#000";
                        Circle.style.strokeWidth = "0";
                        Circle.setAttribute("id", `c${wid}`)
                        Circle.style.pointerEvents = 'none'
                        svg.appendChild(Circle);
                    }
                } catch (Err) {}
            })
        let s = svgPanZoom(`${MapContainer} svg`)
        $(`${ParentElem} #resetZoom`).on('click', function() {
            resetMap(s)
        })
        $(`${MapContainer} .wilaya`).on("mouseenter", function() {
            let id = $(this).attr('id')
            $(`${MapContainer} #c${id}`).css('filter', 'brightness(2)')
        }).on('mouseleave', function() {
            let id = $(this).attr('id')
            $(`${MapContainer} #c${id}`).css('filter', 'brightness(1)')
        })
        if (!options.circles) // Hide/Show circles
            $(`${MapContainer} svg circle`).fadeOut(100)



    }, [options.circleColor, options.circleRadius, options.circleLabel])
    useEffect(() => {
        $(`${MapContainer}  svg circle`).css('fill', options.circleColor)
        $(`${MapContainer}  svg circle`).each((index, Circle) => {
            let id = $(Circle).attr('id')
            $(`#${id}`).attr('r', Number(Circles[id]) * options.circleRadius / max)
        })

    }, [options.circleColor, options.circleRadius, options.circleLabel])
}