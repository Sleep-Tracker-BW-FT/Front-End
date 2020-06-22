import React from 'react';
import CanvasJSReact from './canvasjs.react'
import {connect} from 'react-redux'
 var CanvasJSChart = CanvasJSReact.CanvasJSChart

const UserChart = props =>{
    const options = {
        animationEnabled: true,
        title:{
            text: "Sleep Record"
        },
        axisX: {
            valueFormatString: "Day #"
        },
        axisY: {
            title: "Mood Throughout the Day",
            includeZero: false
        },
        data: [{
            type: "spline",
            showInLegend: true,
            name: 'Morning Mood',
            dataPoints: [
                { x: 1, y: 1 },
                { x: 2, y: 2 },
                { x: 3, y: 3 },
                { x: 4, y: 4 },
                { x: 5, y: 3 },
                { x: 6, y: 2 },
                { x: 7, y: 1 },
                { x: 8, y: 2 },
                { x: 9, y: 3 },
                { x: 10, y: 4 },
                { x: 11, y: 3 },
                { x: 12, y: 2 }
            ]
        },
    {
        type: 'spline',
        showInLegend: true,
        name: 'Noon Mood',
        dataPoints: [
            {x: 1, y: 1},
            {x: 2, y: 1},
            {x: 3, y: 1},
            {x: 4, y: 1},
            {x: 5, y: 1},
            {x: 6, y: 1},
            {x: 7, y: 1},
        ]
    }
    ]
    }
return(
    <div>
    <CanvasJSChart options = {options}
        /* onRef={ref => this.chart = ref} */
    />
</div>    
)
}

const mapStateToProps = state =>{
    return{
        user: state
    }
}

export default connect(mapStateToProps, {})(UserChart)