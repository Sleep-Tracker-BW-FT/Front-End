import React, { useState } from 'react';
import {connect} from 'react-redux'
import UserChart from './chart'
import axiosWithAuth from '../utils/axiosWithAuth'

const UserPage = props =>{
    const [editting, setEditting] = useState(false)
    const [values, setValues] = useState({
        hours: 0,
        morning: 1,
        noon: 1,
        evening: 1
    })
    const addNew = () =>{

    }

    const changeHandler = e =>{
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    return(
        <div>
            <div>
                <h1>userName Sleep Record</h1>
                <p>You have logged (x) days with us so far!</p>
                <p>This chart below shows your current pattern of moods throughout each day</p>
                <UserChart />
            </div>
            <div>
                <button onClick={()=>setEditting(!editting)}>Add new day</button>
                {editting && (<div>
                    <form onSubmit={addNew}>                        
                        <label>Hours slept</label>
                        <input 
                            name='hours'
                            onChange={changeHandler}
                            type= 'number'
                        />

                        <label>Morning Mood</label>
                        <select
                            name='morning'
                            onChange={changeHandler}
                        >                        
                            <option value={1}>😴</option>
                            <option value={2}>😑</option>
                            <option value={3}>🙂</option>
                            <option value={4}>😃</option>
                        </select>

                        <label>Noon mood</label>
                        <select
                            name='noon'
                            onChange={changeHandler}
                        >
                            <option value={1}>😴</option>
                            <option value={2}>😑</option>
                            <option value={3}>🙂</option>
                            <option value={4}>😃</option>
                        </select>

                        <label>Evening mood</label>
                        <select
                            name='evening'
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

export default connect(mapStateToProps, {})(UserPage)