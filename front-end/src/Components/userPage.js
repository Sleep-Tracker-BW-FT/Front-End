import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux'
import UserChart from './chart'
import {axiosWithAuth} from '../utils/axiosWithAuth'
import {addDay} from '../actions/userActions'
import SleepChart from './sleepChart'

const UserPage = props =>{
    const [editting, setEditting] = useState(false)
    const [values, setValues] = useState({
        hours: 0,
        morningMood: 1,
        noonMood: 1,
        eveningMood: 1
    })

    const changeHandler = e =>{
        setValues({
            ...values,
            [e.target.name]: Number(e.target.value)
        })
    }

    return(
        <div>
            <div>
                <h1>{props.user.username} Sleep Record</h1>
                <p>You have logged {props.user.sleepRecord.length} days with us so far!</p>
                <p>This chart below shows your current pattern of moods throughout each day</p>
                <UserChart />
                <SleepChart />
            </div>
            <div>
                <button onClick={()=>setEditting(!editting)}>Add new day</button>
                {editting && (<div>
                    <form onSubmit={(e)=>{
                        e.preventDefault()
                        props.addDay({...values, id: props.user.id})}}>                        
                        <label>Hours slept</label>
                        <input 
                            name='hours'
                            onChange={changeHandler}
                            type= 'number'
                        />

                        <label>Morning Mood</label>
                        <select
                            name='morningMood'
                            onChange={changeHandler}
                        >                        
                            <option value={1}>😴</option>
                            <option value={2}>😑</option>
                            <option value={3}>🙂</option>
                            <option value={4}>😃</option>
                        </select>

                        <label>Noon mood</label>
                        <select
                            name='noonMood'
                            onChange={changeHandler}
                        >
                            <option value={1}>😴</option>
                            <option value={2}>😑</option>
                            <option value={3}>🙂</option>
                            <option value={4}>😃</option>
                        </select>

                        <label>Evening mood</label>
                        <select
                            name='eveningMood'
                            onChange={changeHandler}
                        >
                            <option value={1}>😴</option>
                            <option value={2}>😑</option>
                            <option value={3}>🙂</option>
                            <option value={4}>😃</option>                                
                        </select>

                        <button name='submit'>Add Day</button>
                    </form>
                    </div>)}
            </div>
        </div>
    )
}

const mapStateToProps=state=>{
    return{
        user: state
    }
}

export default connect(mapStateToProps, {addDay})(UserPage)