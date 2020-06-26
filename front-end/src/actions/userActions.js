import axios from 'axios'
import {axiosWithAuth} from '../utils/axiosWithAuth'
import {useHistory} from 'react-router-dom'

export const fetchUser = (user) =>{
    // console.log('fetching user', user)
    return dispatch =>{
        dispatch({type: 'FETCH_USER_START'})
        axiosWithAuth()
        .post('/api/auth/login', user)
        .then(res=>{
            // console.log('fetch user response', res)
            // localStorage.setItem('token', res.data.token)
            dispatch({type: 'FETCH_USER_SUCCESS',token:res.data.token, payload: res.data.user})
            dispatch({type: 'FETCH_USER_SLEEP_RECORD'})
            axiosWithAuth()
            .get('/api/users')
            .then(res=>{
                console.log('sleep timer data',res.data.time)
                dispatch({type: 'USER_SLEEP_RECORD_FETCH_SUCCESS', payload: res.data.time})
            })
            .catch(err=>{
                dispatch({type: 'USER_INFO_FETCH_FAIL'})
                console.log(err)})
        })
        .catch(err=>{
            dispatch({type: 'FETCH_FAIL'})
            console.log(err)
        })
    }
}

export const addDay = newDay =>{
    console.log('adding a day')
    const sleepEnd = (`2020-07-01 ${newDay.hours}:00:00`)
    const submitDay = {
        sleep_start:('2020-07-01 00:00:00'),
        start_score: `${newDay.morningMood}`,
        sleep_end:(sleepEnd),
        end_score: `${newDay.noonMood}`,
        overall_score: `${newDay.eveningMood}`,
        user_id: `${newDay.id}`
    }
    return dispatch =>{
        dispatch({type: 'ADD_DAY_START'})
        console.log('submitted day:', submitDay)
        axiosWithAuth()
        .post('/api/users', submitDay)
        .then(res=>{
            
            dispatch({type:'ADD_DAY_SUCCESS'})
            // console.log(res.data)
            dispatch({type: 'FETCH_USER_INFO'})
            axiosWithAuth()
            .get('/api/users')
            .then(res=>{
                // console.log(res)
                dispatch({type: 'USER_SLEEP_RECORD_FETCH_SUCCESS', payload: res.data.time})
            })
            .catch(err=>{
                dispatch({type: 'USER_INFO_FETCH_FAIL'})
                console.log(err)})
        })
        .catch(err=>{console.log('add day failed', err)})
    }
}


export const createUser = (user) =>{
    return dispatch=>{
    console.log('creating user')
    dispatch({type:'CREATE_USER_START'})
    axiosWithAuth()
    .post('/api/auth/register', user)
    .then(res=>{
        dispatch({type:'USER_CREATED'})
        // console.log(res.data)
    })
    .catch(err=>{console.log(err)})
}}

export const editEntry = day =>{
    console.log('day given for Edit', day)
    return dispatch =>{
        dispatch({type: 'EDIT_ENTRY_START'})
        const sleepEnd = (`2020-07-01 ${day.hours}:00:00`)
        const submittedDay={
                sleep_start:('2020-07-01 00:00:00'),
                start_score: `${day.morningMood}`,
                sleep_end:(sleepEnd),
                end_score: `${day.noonMood}`,
                overall_score: `${day.eveningMood}`,
        }
        console.log('submittedDay', submittedDay)
        axiosWithAuth()
        .put(`/api/users/${day.id}`, submittedDay)
        .then(res=>{
            dispatch({type:'EDIT_ENTRY_SUCCESS'})
            dispatch({type: 'FETCH_USER_SLEEP_RECORD'})
            axiosWithAuth()
            .get('/api/users')
            .then(res=>{
                console.log('sleep timer data',res.data.time)
                dispatch({type: 'USER_SLEEP_RECORD_FETCH_SUCCESS', payload: res.data.time})
            })
            .catch(err=>{
                dispatch({type: 'USER_INFO_FETCH_FAIL'})
                console.log(err)})
        })
        .catch(err=>{console.log(err); dispatch({type:'EDIT_ENTRY_FAIL'})})
    }
}

export const deleteEntry =day =>{
    return dispatch=>{
        dispatch({type: 'DELETE_ENTRY_START'})
        axiosWithAuth()
        .delete(`/api/users/${day.id}`)
        .then(res=>{
            dispatch({type:'DELETE_ENTRY_SUCCESS'})
            dispatch({type: 'FETCH_USER_SLEEP_RECORD'})
            axiosWithAuth()
            .get('/api/users')
            .then(res=>{
                console.log('sleep timer data',res.data.time)
                dispatch({type: 'USER_SLEEP_RECORD_FETCH_SUCCESS', payload: res.data.time})
            })
            .catch(err=>{
                dispatch({type: 'USER_INFO_FETCH_FAIL'})
                console.log(err)})
        })
        .catch(err=>{console.log(err); dispatch({type:'DELETE_ENTRY_FAIL'})})
    }
 
}