import React,{useState} from 'react';
import CanvasJSReact from './canvasjs.react'
import {connect} from 'react-redux'
 var CanvasJSChart = CanvasJSReact.CanvasJSChart

const SleepChart = props =>{
    console.log('props in Sleep chart', props)

    const sleepPerDay = props.sleepRecord.map(day=>{
        return {x: day.day, y: day.hours}
    })

    const options = {
        animationEnabled: true,
        title:{
            text: "Hours of Sleep per Day"
        },
        axisX: {
            valueFormatString: "Day #"
        },
        axisY: {
            title: "Hours",
            includeZero: true
        },
        data: [{
            type: "spline",
            dataPoints: sleepPerDay
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
        sleepRecord: state.sleepRecord
    }
}

export default connect(mapStateToProps, {})(SleepChart)