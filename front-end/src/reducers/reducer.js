
const herState = {
    sleep_start:('YYYY-MM-DD hh:mm:ss'),
    sleep_end:('YYYY-MM-DD hh:mm:ss'),
    start_score: 1,
    end_score: 1,
    overall_score: 1
}


export const initialState ={
    username:'Nick Ussery',
    email: 'nick.nick@nick.com',
    id: 1,
    sleepRecord: [],
    isFetching: false
}

export const userReducer = (state=initialState, action)=>{
    console.log(action)
    switch(action.type){
        case 'USER_SLEEP_RECORD_FETCH_SUCCESS':
            return{
                ...state,
                sleepRecord: action.payload.map(day=>{
                    const colonFinder = day.sleep_end.indexOf(':')
                    const spaceFinder = day.sleep_end.indexOf(' ')
                    const totalSleep = Number(day.sleep_end.slice(spaceFinder+1, colonFinder))
                    // console.log('totalSleep=', totalSleep)
                    return{
                        hours:totalSleep,
                        morningMood: day.start_score,
                        noonMood: day.end_score,
                        eveningMood: day.overall_score,
                        id: day.id
                    }
                })
            }
        // case 'ADD_DAY':
        //     return{
        //         ...state,
        //         sleepRecord:[
        //             ...state.sleepRecord,
        //             {
        //                 hours: action.payload.hours,
        //                 day: state.sleepRecord.length+1,
        //                 morningMood: action.payload.morningMood,
        //                 noonMood: action.payload.noonMood,
        //                 eveningMood: action.payload.eveningMood
        //             }
        //         ]
        //     }
        case 'FETCH_USER_START':
            return {
                ...state,
                isFetching: true
            }
        case 'FETCH_USER_SUCCESS':
            localStorage.setItem('token', action.token)
            return {
                ...state,
                username:action.payload.first_name + action.payload.last_name,
                email: action.payload.email,
                id: action.payload.id
            }
        default: return state
    }
}