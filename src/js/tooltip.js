import $ from 'jquery'
import chroma from 'chroma-js'
import { WilayaNames } from './Wilayas'
import '../css/tooltip.css'

export function ttStyle(Color, ParentElem) {
    const TextColor = chroma.contrast(Color, 'white') > chroma.contrast(Color, 'black') ? 'white' : 'black'
    return `${ParentElem} .info { background:${Color}; color: ${TextColor};}`
}
export function dzTooltip(e, Wilayas, labels, Parent) {
    const ParentElem = `[data-panelid=${Parent}]`;
    $(function() {
        $(e).html(`<span class="info"><div class="tt-title"></div><div class="tt-more"></div> </span>`)
        $(ParentElem + " [id^=w]").hover(function() {
            let id = $(this).attr('id')
            let name = WilayaNames[id]
            try {
                if (id) {
                    let more = ``
                    let vals = Wilayas[id]
                    for (let i = 0; i < labels.length; i++)
                        more += `<div class="more-class">
							<div>${labels[i]}</div>
							<div>${vals[i]}</div>
						</div>`
                    $(e + ' .tt-title').text(`${name}`)
                    $(e + ' .tt-more').html(more)
                    $(e + ' .info').stop().fadeIn(100)
                }
            } catch (e) {

            }

        }, function() {
            let id = $(this).attr('id')
            try {
                if (id) {
                    $(e + ' .info').stop().fadeOut(100)
                    $(e + ' .tt-title').text(``)
                    $(e + ' .tt-more').html('')
                }
            } catch (e) {

            }
        });
    })
}