import React,{useState} from 'react'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {editEntry, deleteEntry} from '../actions/userActions'

const EditPage = props =>{
    console.log('props in EditPage', props)
    const [edit, setEdit] = useState(false)
    const clickHandler = day =>{
        setEdit(true)
        console.log('edit target', day)
        setValues(day)
    }

    const history = useHistory()
    const [editting, setEditting] = useState(false)
    const [values, setValues] = useState({
        hours: 0,
        morningMood: 1,
        noonMood: 1,
        eveningMood: 1,
        id:0
    })

    const changeHandler = e =>{
        setValues({
            ...values,
            [e.target.name]: Number(e.target.value)
        })
    }
    
    const records = props.sleepRecord.map((day, index)=>{
        return(
            <p onClick={e=>{
                e.preventDefault()
                clickHandler(day)
            }} key={day.id}>Day:{index+1} Hours:{day.hours} Morning Mood:{day.morningMood} Noon Mood:{day.noonMood} Evening Mood:{day.eveningMood}</p>
        )
    })


    return(
        <div>
        {records}
        {edit &&(
                    <form onSubmit={(e)=>{
                        e.preventDefault()
                        props.editEntry({...values, user_id:props.id})}}>                        
                        <label>Hours slept</label>
                        <input 
                            name='hours'
                            onChange={changeHandler}
                            type= 'number'
                            value={values.hours}
                        />

                        <label>Morning Mood</label>
                        <select
                            name='morningMood'
                            onChange={changeHandler}
                            value={values.morningMood}
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
                            value={values.noonMood}
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
                            value={values.eveningMood}
                        >
                            <option value={1}>😴</option>
                            <option value={2}>😑</option>
                            <option value={3}>🙂</option>
                            <option value={4}>😃</option>                                
                        </select>

                        <button name='submit'>Change Day</button>
                        <button name='delete' onClick={(e)=>{
                            e.preventDefault()
                            props.deleteEntry({...values, user_id:props.id})
                            setEdit(false)
                        }}>Delete Day</button>
                    </form>
        )}
        </div>
    )


}

const mapStateToProps = state =>{
    return state
}

export default connect(mapStateToProps, {editEntry, deleteEntry}) (EditPage)