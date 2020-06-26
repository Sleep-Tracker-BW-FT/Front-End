import React,{useState, useEffect} from 'react';
import CanvasJSReact from './canvasjs.react'
import {connect} from 'react-redux'
 var CanvasJSChart = CanvasJSReact.CanvasJSChart

const UserChart = props =>{
    console.log('props in chart', props)
    //set the moods by mapping from props
    const morningMoods =props.sleepRecord.map((day, index)=>{
        return {x: index+1, y: day.morningMood}
    })

    const noonMoods = props.sleepRecord.map((day, index)=>{
        return {x: index+1, y: day.noonMood}
    })

    const eveningMoods = props.sleepRecord.map((day, index)=>{
        return {x: index +1, y: day.eveningMood}
    })

    const options ={
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



    // console.log('morningMoods', morningMoods)



    const style={
        color: 'black',
        backgroundColor:'white'
    }
return(
    <div className='chart' style={style}>
    <CanvasJSChart options = {options}/>
</div>    
)
}

const mapStateToProps = state =>{
    return{
        sleepRecord: state.sleepRecord
    }
}

export default connect(mapStateToProps, {})(UserChart)