import axios from 'axios'
import axiosWithAuth from '../utils/axiosWithAuth'

export const fetchUser = () =>{
    console.log('fetching user')
    return dispatch =>{
        dispatch({type: 'FETCH_USER_START'})
        axiosWithAuth()
        .get()
        .then(res=>{
            console.log('fetch user response', res)
            dispatch({type: 'FETCH_USER_SUCCESS', payload: res.data})
        })
        .catch(err=>{console.log(err)})
    }
}