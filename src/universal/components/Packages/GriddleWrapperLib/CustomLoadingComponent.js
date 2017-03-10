import React from 'react'
import ReactSpinner from 'react-spinjs'

class CustomLoadingComponent extends React.Component {
    constructor(props, context) {
        super(props, context)
    }
    render() {
        const spinnerConfig = {
            //http://spin.js.org/
            lines: 13 // The number of lines to draw
, length: 51 // The length of each line
, width: 14 // The line thickness
, radius: 59 // The radius of the inner circle
, scale: 0.25 // Scales overall size of the spinner
, corners: 1 // Corner roundness (0..1)
, color: '#000' // #rgb or #rrggbb or array of colors
, opacity: 0.2 // Opacity of the lines
, rotate: 0 // The rotation offset
, direction: 1 // 1: clockwise, -1: counterclockwise
, speed: 0.8 // Rounds per second
, trail: 76 // Afterglow percentage
, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
, zIndex: 2e9 // The z-index (defaults to 2000000000)
, className: 'spinner' // The CSS class to assign to the spinner
, top: '30%' // Top position relative to parent
, left: '50%' // Left position relative to parent
, shadow: true // Whether to render a shadow
, hwaccel: true // Whether to use hardware acceleration
, position: 'absolute' // Element positioning
        }
        return(
        <tr className="no-borders">
            <td className="no-borders">
                <ReactSpinner config={spinnerConfig}/>
            </td>
        </tr>
        )
    }
}

export default CustomLoadingComponent
