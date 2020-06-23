
export const initialState ={
    username:'Nick Ussery',
    email: 'nick.nick@nick.com',
    sleepRecord: [
        {
            hours: 8,
            day: 1,
            morningMood:1,
            noonMood:2,
            eveningMood:3
        }
    ],
    isFetching: false
}

export const userReducer = (state=initialState, action)=>{
    console.log(action)
    switch(action.type){
        case 'ADD_DAY':
            return{
                ...state,
                sleepRecord:[
                    ...state.sleepRecord,
                    {
                        hours: action.payload.hours,
                        day: state.sleepRecord.length+1,
                        morningMood: action.payload.morningMood,
                        noonMood: action.payload.noonMood,
                        eveningMood: action.payload.eveningMood
                    }
                ]
            }
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