export default (state={}, action) => {
    switch (action.type) {
        case 'GET_COURSES': return {  ...state, tt_cours: action.payload  };
        case 'GET_COURSE': 
            const info = action.payload;
            return {...state, courseGetInfo: info};
        default:
            return {...state}
    }
}