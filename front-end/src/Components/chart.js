import React,{useState} from 'react';
import CanvasJSReact from './canvasjs.react'
import {connect} from 'react-redux'
 var CanvasJSChart = CanvasJSReact.CanvasJSChart

const UserChart = props =>{
    console.log('props in chart', props)

    const morningMoods = props.sleepRecord.map(day=>{
        return {x: day.day, y: day.morningMood}
    })

    const noonMoods = props.sleepRecord.map(day=>{
        return {x: day.day, y: day.noonMood}
    })

    const eveningMoods = props.sleepRecord.map(day=>{
        return {x: day.day, y: day.eveningMood}
    })

    console.log('morningMoods', morningMoods)

    const options = {
        animationEnabled: true,
        title:{
            text: "Moods Through the Day"
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
            dataPoints: morningMoods
        },
    {
        type: 'spline',
        showInLegend: true,
        name: 'Noon Mood',
        dataPoints: noonMoods
    },
    {
        type: 'spline',
        showInLegend: true,
        name: 'Evening Mood',
        dataPoints: eveningMoods
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

export default connect(mapStateToProps, {})(UserChart)