import React from 'react';

export const initialState ={
    username:'Nick Ussery',
    email: 'nick.nick@nick.com',
    sleepRecord: [
        {
            morningMood:1,
            noonMood:1,
            eveningMood:1
        }
    ],
    isFetching: false
}

export const userReducer = (state=initialState, action)=>{
    console.log(action)
    switch(action.type){
        case 'FETCH_USER_START':
            return {
                ...state,
                isFetching: true
            }
        case 'FETCH_USER_SUCCESS':
            return {
                ...state,
                isFetching: false,
                username: action.payload.firstName + " " + action.payload.lastName,
                email: action.payload.email,
                sleepRecord: action.payload.sleepRecord
            }
        default: return state
    }
}